// components/weather-news.tsx
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle, Loader2, Newspaper, CloudSun, CloudRain, CloudSnow } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns-tz";
import { fr } from "date-fns/locale";

interface WeatherArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

// Liste de mots-clés strictement météorologiques
const WEATHER_KEYWORDS = [
  "météo", "climat", "tempête", "ouragan", "typhon", "précipitations",
  "neige", "gel", "canicule", "chaleur", "froid", "inondation",
  "sécheresse", "vent", "orage", "éclair", "température", "humidité",
  "météorologie", "prévision", "alerte", "changement climatique"
];

export function WeatherNews() {
  const {
    data: articles,
    isLoading,
    error,
    refetch,
  } = useQuery<WeatherArticle[]>({
    queryKey: ["weather-news"],
    queryFn: async () => {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${WEATHER_KEYWORDS.join(" OR ")}&language=fr&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      );
      
      if (!response.ok) throw new Error("Échec de récupération des actualités");
      
      const data = await response.json();
      return data.articles
        .filter((article: WeatherArticle) => 
          article.title && 
          article.description && 
          article.urlToImage &&
          // Filtre supplémentaire pour éliminer les faux positifs
          WEATHER_KEYWORDS.some(keyword => 
            article.title.toLowerCase().includes(keyword) ||
            article.description.toLowerCase().includes(keyword)
          )
        )
        .slice(0, 9); // 9 articles pour une grille 3x3
    },
    staleTime: 30 * 60 * 1000,
  });

  const getWeatherIcon = (title: string) => {
    if (/pluie|précipitation|inondation/i.test(title)) return <CloudRain className="h-5 w-5" />;
    if (/neige|gel|froid/i.test(title)) return <CloudSnow className="h-5 w-5" />;
    if (/canicule|chaleur/i.test(title)) return <CloudSun className="h-5 w-5" />;
    return <Newspaper className="h-5 w-5" />;
  };

  if (isLoading) return <LoadingSkeleton />;

  if (error) return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Erreur</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Impossible de charger les actualités météo</p>
        <Button variant="outline" onClick={() => refetch()} className="w-fit">
          <Loader2 className="mr-2 h-4 w-4" />
          Réessayer
        </Button>
      </AlertDescription>
    </Alert>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Newspaper className="h-6 w-6" />
          Weather News
        </h1>
        <Button onClick={() => refetch()} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <NewsCard 
            key={article.url} 
            article={article} 
            icon={getWeatherIcon(article.title)}
          />
        ))}
      </div>
    </div>
  );
}

// Composant séparé pour la carte d'actualité
function NewsCard({ article, icon }: { article: WeatherArticle; icon: React.ReactNode }) {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
          </div>
          <div className="text-sm text-muted-foreground">
            {format(new Date(article.publishedAt), "PPP", { timeZone: "Europe/Paris", locale: fr })} • {article.source.name}
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-40 object-cover rounded-md mb-3"
            onError={(e) => (e.currentTarget.src = "/weather-placeholder.jpg")}
          />
          <p className="text-muted-foreground line-clamp-3">{article.description}</p>
        </CardContent>
      </a>
    </Card>
  );
}

// Squelette de chargement
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-3/4 dark:bg-gray-700" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full dark:bg-gray-700" />
            <div className="h-4 bg-gray-200 rounded w-5/6 dark:bg-gray-700" />
            <div className="h-32 bg-gray-200 rounded w-full dark:bg-gray-700" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}