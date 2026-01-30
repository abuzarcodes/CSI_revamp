"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import NavBar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Event, EventsApiResponse, RegistrationFormData } from "@/types/events";

export default function JoinUs() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data: EventsApiResponse = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Error",
          description: "Failed to load events. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  const handleSubmit = async (
    formData: RegistrationFormData
  ): Promise<boolean> => {
    try {
      console.log("Submitting form data:", formData);

      const response = await fetch("/api/admin/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        console.log("Response not ok, throwing error");
        throw new Error(data.error || "Registration failed");
      }

      console.log("Registration successful");
      toast({
        title: "Success!",
        description: "Your registration has been submitted successfully",
      });

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: (error as Error).message || "An error occurred during registration",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900">
        <NavBar />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
              Join Our Events
            </h1>
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <EventRegistrationForm
                  events={events}
                  onSubmit={handleSubmit}
                />
              )}
            </AnimatePresence>
          </div>
        </main>
        <Footer />
        <Toaster />
      </div>
    </ToastProvider>
  );
}
