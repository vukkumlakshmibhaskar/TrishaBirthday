import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Message {
  id: number;
  author: string;
  content: string;
}

interface MessageSectionProps {
  messages: Message[];
}

const LOCAL_STORAGE_KEY = 'birthdayMessages';

const MessageSection = ({ messages: initialMessages }: MessageSectionProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);
  const [hearts, setHearts] = useState<{id: number, x: number, y: number}[]>([]);
  const { toast } = useToast();

  // Load messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // If no saved messages, use the initial messages from props
      setMessages(initialMessages);
      // Save initial messages to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialMessages));
    }
  }, [initialMessages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Invalid input",
        description: "Please enter both your name and message",
        variant: "destructive",
      });
      return;
    }
    
    // Create new message with a unique ID
    const newMessage = {
      id: Date.now(),
      author: name,
      content: message
    };
    
    // Add new message to the list
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    
    // Save to localStorage immediately
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMessages));
    
    // Clear form fields
    setName('');
    setMessage('');
    
    // Show success toast
    toast({
      title: "Message added!",
      description: "Your message has been added to the birthday wishes",
    });
  };
  
  const createHeart = (messageId: number) => {
    const randomX = Math.random() * 40 - 20; // Between -20 and 20
    const randomY = -Math.random() * 20 - 10; // Between -10 and -30
    
    const newHeart = {
      id: Date.now(),
      x: randomX,
      y: randomY
    };
    
    setHearts(prev => [...prev, newHeart]);
    
    // Remove heart after animation completes
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 1500);
  };
  
  const confirmDeleteMessage = (id: number) => {
    setMessageToDelete(id);
  };
  
  const handleDeleteMessage = () => {
    if (messageToDelete === null) return;
    
    const updatedMessages = messages.filter(msg => msg.id !== messageToDelete);
    setMessages(updatedMessages);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMessages));
    
    toast({
      title: "Message deleted permanently",
      description: "The message has been removed",
    });
    
    setMessageToDelete(null);
  };
  
  const handleDeleteAllMessages = () => {
    setMessages([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    
    toast({
      title: "All messages permanently deleted",
      description: "All birthday messages have been removed",
    });
    
    setShowDeleteAllDialog(false);
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-2 text-birthday-purple">
        Birthday Wishes
      </h2>
      
      <div className="flex justify-center mb-8">
        <Heart className="text-birthday-pink animate-bounce h-8 w-8" />
      </div>
      
      <div className="flex justify-end mb-4 max-w-4xl mx-auto">
        {messages.length > 0 && (
          <AlertDialog open={showDeleteAllDialog} onOpenChange={setShowDeleteAllDialog}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Messages
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all birthday messages.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAllMessages}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Yes, Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {messages.map((message) => (
          <Card key={message.id} className="shadow-md hover:shadow-xl transition-all relative group">
            <CardContent className="p-6">
              <div className="mb-4 text-lg italic break-words whitespace-pre-wrap">
                "{message.content}"
              </div>
              <div className="flex justify-between items-center">
                <div className="text-birthday-purple font-medium">
                  — {message.author}
                </div>
                
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-birthday-pink hover:text-birthday-purple hover:bg-transparent relative overflow-visible"
                    onClick={() => createHeart(message.id)}
                  >
                    <Heart className="h-4 w-4 animate-pulse" />
                    {hearts.map(heart => (
                      <div
                        key={heart.id}
                        className="absolute pointer-events-none"
                        style={{
                          animation: 'float-heart 1.5s forwards ease-out',
                          opacity: 0,
                          transform: `translate(${heart.x}px, ${heart.y}px) scale(0)`,
                        }}
                      >
                        <Heart 
                          className="h-5 w-5 fill-birthday-pink text-transparent"
                        />
                      </div>
                    ))}
                  </Button>
                  
                  <AlertDialog open={messageToDelete === message.id} onOpenChange={(open) => {
                    if (!open) setMessageToDelete(null);
                  }}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-transparent"
                        onClick={() => confirmDeleteMessage(message.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to permanently delete this message? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleDeleteMessage}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          Yes, Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Add new message form */}
      <div className="mt-12 max-w-md mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-birthday-purple">Add Your Wish</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={50}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your birthday wish here..."
                  rows={4}
                  maxLength={500}
                  className="whitespace-pre-wrap"
                />
              </div>
              
              <Button type="submit" className="w-full birthday-btn flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Post Wish
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessageSection;
