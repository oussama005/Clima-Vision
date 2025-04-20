// Calendar.tsx
import { useState, useEffect } from "react";
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { CalendarClock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'reminder' | 'task';
  description?: string;
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({ 
    title: '', 
    date: new Date(), 
    type: 'meeting',
    description: ''
  });

  // Load sample events
  useEffect(() => {
    const sampleEvents: Event[] = [
      {
        id: '1',
        title: 'Weather team meeting',
        date: addDays(new Date(), 2),
        type: 'meeting',
        description: 'Quarterly weather pattern review'
      },
      {
        id: '2',
        title: 'Satellite data analysis',
        date: addDays(new Date(), 5),
        type: 'task',
        description: 'Analyze new satellite imagery'
      },
      {
        id: '3',
        title: 'Monthly report deadline',
        date: addDays(new Date(), 7),
        type: 'reminder',
        description: 'Submit monthly climate report'
      }
    ];
    setEvents(sampleEvents);
  }, []);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    setNewEvent(prev => ({ ...prev, date: day }));
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <Button variant="outline" size="icon" onClick={prevMonth}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <h2 className="text-xl font-semibold text-center">
        {format(currentMonth, 'MMMM yyyy')}
      </h2>
      
      <Button variant="outline" size="icon" onClick={nextMonth}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center font-medium text-sm py-2 text-muted-foreground" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dayEvents = events.filter(event => isSameDay(event.date, cloneDay));

        days.push(
          <div
            className={cn(
              "min-h-24 p-1 border border-border",
              "hover:bg-accent/50 transition-colors cursor-pointer",
              !isSameMonth(day, monthStart) ? "text-muted-foreground/50 bg-muted/10" : "",
              isSameDay(day, selectedDate) ? "bg-primary/10 border-primary" : "",
              "relative"
            )}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex justify-between items-start">
              <span className={cn(
                "inline-flex items-center justify-center h-6 w-6 rounded-full text-sm",
                isSameDay(day, new Date()) ? "bg-primary text-primary-foreground" : ""
              )}>
                {format(day, 'd')}
              </span>
              {dayEvents.length > 0 && (
                <span className="h-2 w-2 rounded-full bg-primary absolute top-1 right-1"></span>
              )}
            </div>
            <div className="mt-1 space-y-1 max-h-16 overflow-y-auto">
              {dayEvents.slice(0, 2).map(event => (
                <div 
                  key={event.id}
                  className={cn(
                    "text-xs p-1 rounded truncate border",
                    event.type === 'meeting' ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30' :
                    event.type === 'task' ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/30' :
                    'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/30'
                  )}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-muted-foreground text-center">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mb-4">{rows}</div>;
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: Math.random().toString(36).substring(2, 9),
      ...newEvent
    };
    setEvents([...events, event]);
    setNewEvent({ 
      title: '', 
      date: selectedDate, 
      type: 'meeting',
      description: '' 
    });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const dayEvents = events.filter(e => isSameDay(e.date, selectedDate));

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">
          Manage your weather-related events and schedules
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Weather Team Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              {renderHeader()}
              {renderDays()}
              {renderCells()}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Click on a date to view or add events
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5" />
                {format(selectedDate, 'PPP')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dayEvents.length > 0 ? (
                <div className="space-y-3">
                  {dayEvents.map(event => (
                    <div 
                      key={event.id}
                      className={cn(
                        "p-3 rounded-lg border",
                        event.type === 'meeting' ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30' :
                        event.type === 'task' ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/30' :
                        'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/30'
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge 
                            variant={event.type === 'meeting' ? 'default' : 
                                    event.type === 'task' ? 'secondary' : 'outline'}
                            className="mt-1"
                          >
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {event.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        {format(event.date, 'hh:mm a')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <CalendarClock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No events scheduled</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add New Event</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="Team meeting"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Event details"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Event Type</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value: any) => setNewEvent({...newEvent, type: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full">
                    Add Event
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}