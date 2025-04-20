import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, HelpCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { useTheme } from "@/context/theme-provider";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export function ClimaVisionAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastAIRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: "1",
        content: `Hello! I'm ClimaVision, your intelligent weather assistant. I can help you with:\n\n- Accurate weather forecasts\n- Climate data analysis\n- Weather alerts and recommendations\n- Explanations of meteorological phenomena\n\nI can also tell you about ClimaVision features:\n- Real-time weather maps\n- 10-day forecasts\n- Hourly temperature charts\n- Weather news updates\n\nHow can I assist you today?`,
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
    scrollToBottom('all');
  }, []);

  // Function to scroll to bottom
  const scrollToBottom = (target: 'all' | 'ai' = 'all') => {
    setTimeout(() => {
      if (target === 'ai' && lastAIRef.current) {
        lastAIRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      } else if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  // Auto-scroll when messages or loading state changes
  useEffect(() => {
    scrollToBottom('all');
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate API call to AI service
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getMockResponse(input),
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      
      // Focus on AI response after it's added
      setTimeout(() => {
        scrollToBottom('ai');
      }, 150);
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm experiencing technical difficulties. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced mock responses with website explanations
  const getMockResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! Welcome to ClimaVision. How can I assist you with weather information today?";
    } else if (input.includes("about") || input.includes("what is climavision")) {
      return `ClimaVision is a comprehensive weather platform that provides:\n\n- Accurate real-time weather data\n- Interactive weather maps\n- Detailed forecasts\n- Climate analysis tools\n- Weather news and alerts\n\nOur mission is to make weather information accessible and understandable for everyone.`;
    } else if (input.includes("feature") || input.includes("what can this site do")) {
      return `ClimaVision offers these key features:\n\n1. Weather Dashboard: Personalized weather overview\n2. Interactive Map: Visualize weather patterns\n3. 10-Day Forecast: Plan ahead with confidence\n4. Hourly Data: Minute-by-minute predictions\n5. Weather News: Stay informed on climate events\n6. AI Assistant: That's me! I can answer your weather questions\n\nWhich feature would you like to know more about?`;
    } else if (input.includes("map")) {
      return `The Weather Map feature allows you to:\n\n- View real-time temperature, precipitation, and wind patterns\n- Track storms and weather systems\n- Compare different meteorological data layers\n- Zoom to specific locations\n\nYou can access it from the navigation menu or by clicking "Map" in the sidebar.`;
    } else if (input.includes("forecast") || input.includes("prediction")) {
      return "Our forecasting system provides:\n\n- Hourly updates for the next 48 hours\n- 10-day outlook with temperature trends\n- Precipitation probability\n- UV index and air quality information\n- Sunrise/sunset times\n\nWould you like forecast details for a specific location?";
    } else if (input.includes("thank")) {
      return "You're welcome! Remember, I'm here 24/7 to help with any weather questions. Stay safe out there!";
    } else if (input.includes("help") || input.includes("support")) {
      return `I can help you with:\n\n1. Weather Questions: Current conditions, forecasts, etc.\n2. Site Navigation: How to use ClimaVision features\n3. Weather Explanations: Understanding meteorological terms\n4. Recommendations: What to wear, travel advice\n\nFor technical support, please visit our Contact page.`;
    } else {
      return `As your ClimaVision assistant, I specialize in weather information. Here's what I can do:\n\n- Provide precise weather forecasts\n- Explain weather phenomena\n- Offer personalized recommendations\n- Guide you through our website features\n\nTry asking about:\n- Current weather in your area\n- How to use the weather map\n- Explanation of weather terms\n- Travel weather recommendations`;
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4 gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">ClimaVision Assistant</h1>
          <p className="text-muted-foreground">
            Your intelligent guide to weather and climate
          </p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Weather Assistant</CardTitle>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Bot className="h-3 w-3" />
              <span>Online</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea 
            className="h-[500px] p-4"
            ref={scrollAreaRef}
          >
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  ref={message.role === "assistant" && index === messages.length - 1 ? lastAIRef : null}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={theme === "dark" ? "/logoDark.png" : "/logo2.png"} />
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={theme === "dark" ? "/logoDark.png" : "/logo2.png"} />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[80%] rounded-lg px-4 py-3 bg-secondary">
                    <div className="flex gap-2">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your weather question..."
              className="resize-none flex-1"
              rows={1}
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button
          variant="outline"
          className="h-auto py-2 text-xs"
          onClick={() => handleQuickQuestion("What's the weather this week?")}
        >
          Weekly Forecast
        </Button>
        <Button
          variant="outline"
          className="h-auto py-2 text-xs"
          onClick={() => handleQuickQuestion("Do I need an umbrella today?")}
        >
          Umbrella Needed?
        </Button>
        <Button
          variant="outline"
          className="h-auto py-2 text-xs"
          onClick={() => handleQuickQuestion("What features does ClimaVision offer?")}
        >
          Site Features
        </Button>
        <Button
          variant="outline"
          className="h-auto py-2 text-xs"
          onClick={() => handleQuickQuestion("How do I use the weather map?")}
        >
          Using the Map
        </Button>
      </div>

      <div className="mt-4 p-4 bg-secondary rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">About ClimaVision Assistant</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          ClimaVision Assistant is an AI system specialized in meteorology. It combines the latest weather forecasts with intelligent analysis to provide accurate, personalized responses. Our AI uses real-time data from global weather services to deliver the most reliable information. I can also guide you through all features of the ClimaVision website.
        </p>
      </div>
    </div>
  );
}