"use client"
import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  UserIcon,
  HashIcon,
  GraduationCapIcon,
  UserSquare,
  Mail,
  Phone,
  Calendar,
  Loader2,
  Users,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  RefreshCw,
  PartyPopper,
  Save
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Event, MemberData, Answer, ParticipantData, RegistrationFormData, EventRegistrationFormProps, Question } from "@/types/events"

// Constants
const ACADEMIC_OPTIONS = {
  years: [
    { value: "first", label: "First Year" },
    { value: "second", label: "Second Year" },
    { value: "third", label: "Third Year" },
    { value: "fourth", label: "Fourth Year" },
  ],
  branches: [
    { value: "CSE", label: "CSE-CORE" },
    { value: "ECE", label: "ECE" },
    { value: "AIML", label: "AIML" },
    { value: "CC", label: "Cloud Computing" },
    { value: "CYBER", label: "Cyber Security" },
    { value: "DS", label: "Data Science" },
    { value: "CSBS", label: "CSBS" },
    { value: "BCA", label: "BCA" },
    { value: "BBA", label: "BBA" },
    { value: "MBA", label: "MBA" },
    { value: "Others", label: "Others" },
  ],
  sections: [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
    { value: "G", label: "G" },
    { value: "H", label: "H" },
    { value: "I", label: "I" },
    { value: "J", label: "J" },
  ],
}

// Form Field Components
interface FieldProps {
  id: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface InputFieldProps extends FieldProps {
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}

const InputField = ({ id, label, icon: Icon, type = "text", placeholder, value, onChange, required = false }: InputFieldProps) => (
  <div className="w-full">
    <Label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-cyan-300 mb-1 block">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <div className="relative">
      <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-cyan-400 z-10">
        <Icon className="w-4 h-4" />
      </div>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="pl-8 py-2.5 h-10 bg-gray-50 dark:bg-blue-900/20 border-gray-300 dark:border-blue-800 rounded-lg text-gray-900 dark:text-cyan-100 placeholder:text-gray-500 dark:placeholder:text-blue-400 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:border-blue-500 dark:focus:border-cyan-400 transition-colors"
      />
    </div>
  </div>
)

interface SelectFieldProps extends FieldProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  required?: boolean
}

const SelectField = ({ id, label, icon: Icon, options, value, onChange, required = false }: SelectFieldProps) => (
  <div className="w-full">
    <Label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-cyan-300 mb-1 block">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <div className="relative">
      <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-cyan-400 z-10">
        <Icon className="w-4 h-4" />
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full pl-8 pr-3 py-2.5 h-10 bg-gray-50 dark:bg-blue-900/20 border border-gray-300 dark:border-blue-800 rounded-lg text-gray-900 dark:text-cyan-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:border-blue-500 dark:focus:border-cyan-400 text-sm">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
)

// Question Component
interface QuestionFieldProps {
  question: Question
  answer: string | number | string[]
  onChange: (answer: string | number | string[]) => void
}

const QuestionField = ({ question, answer, onChange }: QuestionFieldProps) => {
  const handleChange = (value: string) => {
    if (question.type === 'mcq') {
      onChange([value])
    } else {
      onChange(value)
    }
  }

  switch (question.type) {
    case 'textarea':
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-cyan-300">
            {question.question} {question.required && <span className="text-red-500">*</span>}
          </Label>
          <Textarea
            value={answer as string}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={question.placeholder}
            maxLength={question.maxLength}
            className="bg-gray-50 dark:bg-blue-900/20 border-gray-300 dark:border-blue-800 rounded-lg text-gray-900 dark:text-cyan-100 placeholder:text-gray-500 dark:placeholder:text-blue-400 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:border-blue-500 dark:focus:border-cyan-400 transition-colors min-h-[100px]"
          />
          {question.maxLength && (
            <div className="text-xs text-gray-500 dark:text-blue-400 text-right">
              {(answer as string)?.length || 0}/{question.maxLength}
            </div>
          )}
        </div>
      )
    case 'number':
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-cyan-300">
            {question.question} {question.required && <span className="text-red-500">*</span>}
          </Label>
          <Input
            type="number"
            value={answer as string}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={question.placeholder}
            className="bg-gray-50 dark:bg-blue-900/20 border-gray-300 dark:border-blue-800 rounded-lg text-gray-900 dark:text-cyan-100 placeholder:text-gray-500 dark:placeholder:text-blue-400 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:border-blue-500 dark:focus:border-cyan-400 transition-colors"
          />
        </div>
      )
    case 'mcq':
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-cyan-300">
            {question.question} {question.required && <span className="text-red-500">*</span>}
          </Label>
          <RadioGroup value={(answer as string[])?.[0] || ''} onValueChange={handleChange}>
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-sm">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )
    default: // text
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-cyan-300">
            {question.question} {question.required && <span className="text-red-500">*</span>}
          </Label>
          <Input
            type="text"
            value={answer as string}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={question.placeholder}
            maxLength={question.maxLength}
            className="bg-gray-50 dark:bg-blue-900/20 border-gray-300 dark:border-blue-800 rounded-lg text-gray-900 dark:text-cyan-100 placeholder:text-gray-500 dark:placeholder:text-blue-400 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:border-blue-500 dark:focus:border-cyan-400 transition-colors"
          />
          {question.maxLength && (
            <div className="text-xs text-gray-500 dark:text-blue-400 text-right">
              {(answer as string)?.length || 0}/{question.maxLength}
            </div>
          )}
        </div>
      )
  }
}

// Success Message Component
const SuccessMessage = ({ eventName, onRegisterAgain }: { eventName: string, onRegisterAgain: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
    className="text-center space-y-6 py-8"
  >
    <div className="flex justify-center">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
        <PartyPopper className="w-12 h-12 text-green-600 dark:text-green-400" />
      </div>
    </div>
    <div className="space-y-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
        Registration Successful!
      </h2>
      <p className="text-gray-600 dark:text-blue-300 max-w-md mx-auto">
        Your registration for <span className="font-semibold">{eventName}</span> has been submitted successfully.
        You will receive a confirmation email shortly.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
      <Button
        onClick={onRegisterAgain}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 text-white shadow-lg hover:shadow-xl"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Register for Another Event</span>
      </Button>
    </div>
    <div className="text-xs text-gray-500 dark:text-blue-400 bg-gray-50 dark:bg-blue-900/20 p-3 rounded-lg">
      If you do not receive a confirmation email within 15 minutes, please check your spam folder or contact support.
    </div>
  </motion.div>
);

// Helper functions
const getInitialMembers = (count: number): MemberData[] =>
  Array(count)
    .fill(null)
    .map(() => ({
      name: "",
      registrationNumber: "",
      section: "",
      year: "",
      branch: "",
      officialEmail: "",
      phoneNumber: "",
    }))

const getInitialParticipant = (): ParticipantData => ({
  name: "",
  registrationNumber: "",
  section: "",
  year: "",
  branch: "",
  officialEmail: "",
  phoneNumber: "",
  selectedTeams: [],
  commonAnswers: [],
  teamAnswers: []
})

// Main Component
export default function EventRegistrationForm({ events = [], onSubmit }: EventRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<RegistrationFormData>({
    eventType: 'team_registration', // Default, will be overwritten
    members: undefined,
    participant: undefined,
    eventId: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast()

  // --- Updated Storage functions using localStorage ---
  const STORAGE_KEY = 'eventRegistrationForm'

  // Helper function to safely save to localStorage
  const saveFormData = (data: RegistrationFormData & { currentStep: number }) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  // Helper function to load from localStorage
  const loadFormData = (): (RegistrationFormData & { currentStep: number }) | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
      }
    } catch (error) {
      console.error('Error loading form data:', error);
    }
    return null;
  };

  // Helper function to clear localStorage
  const clearFormData = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEY);
        setLastSaved(null);
      }
    } catch (error) {
      console.error('Error clearing form data:', error);
    }
  };

  // Load saved data on component mount
  useEffect(() => {
    const savedData = loadFormData();
    if (savedData) {
      setFormData(savedData);
      setCurrentStep(savedData.currentStep);
      setLastSaved(new Date());
    }

    // If no valid saved data, set the first available open event as the default
    const firstOpenEvent = events.find(event => event.isOpen);
    if (firstOpenEvent && firstOpenEvent._id) {
      console.log("Setting default event:", firstOpenEvent.name);
      setFormData({
        eventId: firstOpenEvent._id,
        eventType: firstOpenEvent.eventType,
        members: firstOpenEvent.eventType === 'team_registration' ? getInitialMembers(firstOpenEvent.teamSize || 1) : undefined,
        participant: firstOpenEvent.eventType === 'recruitment' ? getInitialParticipant() : undefined,
      });
    }
    setCurrentStep(0); // Start at the first step
    setIsInitialized(true); // Mark as initialized to prevent this effect from re-running
  }, [events, isInitialized]);

  // Auto-save form data whenever it changes
  useEffect(() => {
    if (formData.eventId && !showSuccess && isInitialized) {
      saveFormData({ ...formData, currentStep });
    }
  }, [formData, currentStep, showSuccess, isInitialized]);

  const currentEvent = events.find(event => event._id === formData.eventId);

  const handleEventChange = (eventId: string) => {
    const selectedEvent = events.find(event => event._id === eventId);
    if (!selectedEvent || !selectedEvent._id) return;

    setFormData({
      eventId: selectedEvent._id,
      eventType: selectedEvent.eventType,
      members: selectedEvent.eventType === 'team_registration' ? getInitialMembers(selectedEvent.teamSize || 1) : undefined,
      participant: selectedEvent.eventType === 'recruitment' ? getInitialParticipant() : undefined,
    });
    setCurrentStep(0); // Go back to the first step for the new form
    toast({
      title: "Event Changed",
      description: `Switched to ${selectedEvent.name}. Form has been reset.`,
    });
  };

  const handleMemberChange = (memberIndex: number, field: keyof MemberData, value: string) => {
    if (!formData.members) return
    setFormData((prev) => {
      const updatedMembers = [...(prev.members || [])]
      updatedMembers[memberIndex] = {
        ...updatedMembers[memberIndex],
        [field]: value,
      }
      return { ...prev, members: updatedMembers }
    })
  }

  const handleParticipantChange = <T extends keyof ParticipantData>(field: T, value: ParticipantData[T]) => {
    if (!formData.participant) return
    setFormData((prev) => ({
      ...prev,
      participant: {
        ...prev.participant!,
        [field]: value,
      }
    }))
  }

  const handleTeamSelection = (teamId: string, checked: boolean) => {
    if (!formData.participant) return
    setFormData((prev) => {
      const participant = prev.participant!
      const selectedTeams = checked
        ? [...participant.selectedTeams, teamId]
        : participant.selectedTeams.filter(id => id !== teamId)
      return {
        ...prev,
        participant: {
          ...participant,
          selectedTeams,
        }
      }
    })
  }

  const handleCommonAnswerChange = (questionId: string, answer: string | number | string[]) => {
    if (!formData.participant) return
    setFormData((prev) => {
      const participant = prev.participant!
      const existingAnswerIndex = participant.commonAnswers.findIndex(a => a.questionId === questionId)
      const newAnswer: Answer = { questionId, answer }

      const commonAnswers = [...participant.commonAnswers]
      if (existingAnswerIndex >= 0) {
        commonAnswers[existingAnswerIndex] = newAnswer
      } else {
        commonAnswers.push(newAnswer)
      }

      return {
        ...prev,
        participant: {
          ...participant,
          commonAnswers,
        }
      }
    })
  }

  const handleTeamAnswerChange = (teamId: string, questionId: string, answer: string | number | string[]) => {
    if (!formData.participant) return
    setFormData((prev) => {
      const participant = prev.participant!
      const teamAnswerIndex = participant.teamAnswers.findIndex(ta => ta.teamId === teamId)
      const newAnswer: Answer = { questionId, answer }

      const teamAnswers = [...participant.teamAnswers]
      if (teamAnswerIndex >= 0) {
        const existingAnswerIndex = teamAnswers[teamAnswerIndex].answers.findIndex(a => a.questionId === questionId)
        if (existingAnswerIndex >= 0) {
          teamAnswers[teamAnswerIndex].answers[existingAnswerIndex] = newAnswer
        } else {
          teamAnswers[teamAnswerIndex].answers.push(newAnswer)
        }
      } else {
        teamAnswers.push({ teamId, answers: [newAnswer] })
      }

      return {
        ...prev,
        participant: {
          ...participant,
          teamAnswers,
        }
      }
    })
  }

  const validateCurrentStep = (): { isValid: boolean; error?: string } => {
    if (currentStep === 0) {
      // Event selection step
      if (!formData.eventId) {
        return { isValid: false, error: "Please select an event" }
      }
      return { isValid: true }
    }

    if (formData.eventType === 'team_registration') {
      if (!formData.members) return { isValid: false, error: "Member data not found" }

      // Validate current member
      const memberIndex = currentStep - 1
      if (memberIndex >= 0 && memberIndex < formData.members.length) {
        const member = formData.members[memberIndex]

        if (!member.name.trim()) {
          return { isValid: false, error: "Name is required" }
        }
        if (!member.registrationNumber.trim()) {
          return { isValid: false, error: "Registration number is required" }
        }
        if (!member.section) {
          return { isValid: false, error: "Section is required" }
        }
        if (!member.year) {
          return { isValid: false, error: "Year is required" }
        }
        if (!member.branch) {
          return { isValid: false, error: "Branch is required" }
        }
        if (!member.officialEmail.trim()) {
          return { isValid: false, error: "Official email is required" }
        }
        if (!member.phoneNumber.trim()) {
          return { isValid: false, error: "Phone number is required" }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(member.officialEmail)) {
          return { isValid: false, error: "Please enter a valid email address" }
        }

        const phoneRegex = /^\d{10}$/
        if (!phoneRegex.test(member.phoneNumber)) {
          return { isValid: false, error: "Phone number must be exactly 10 digits" }
        }
      }
    } else if (formData.eventType === 'recruitment') {
      if (!formData.participant) return { isValid: false, error: "Participant data not found" }

      if (currentStep === 1) {
        // Personal info step
        const participant = formData.participant

        if (!participant.name.trim()) {
          return { isValid: false, error: "Name is required" }
        }
        if (!participant.registrationNumber.trim()) {
          return { isValid: false, error: "Registration number is required" }
        }
        if (!participant.section) {
          return { isValid: false, error: "Section is required" }
        }
        if (!participant.year) {
          return { isValid: false, error: "Year is required" }
        }
        if (!participant.branch) {
          return { isValid: false, error: "Branch is required" }
        }
        if (!participant.officialEmail.trim()) {
          return { isValid: false, error: "Official email is required" }
        }
        if (!participant.phoneNumber.trim()) {
          return { isValid: false, error: "Phone number is required" }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(participant.officialEmail)) {
          return { isValid: false, error: "Please enter a valid email address" }
        }

        const phoneRegex = /^\d{10}$/
        if (!phoneRegex.test(participant.phoneNumber)) {
          return { isValid: false, error: "Phone number must be exactly 10 digits" }
        }
      }

      if (currentStep === 2 && currentEvent?.allowMultipleTeamSelection === false && formData.participant.selectedTeams.length > 1) {
        return { isValid: false, error: "You can only select one team for this event" }
      }

      if (currentStep === 3 && currentEvent?.commonQuestions) {
        // Validate common questions
        for (const question of currentEvent.commonQuestions) {
          const answer = formData.participant.commonAnswers.find(a => a.questionId === question.id)
          if (question.required && (!answer || answer.answer === '' || (Array.isArray(answer.answer) && answer.answer.length === 0))) {
            return { isValid: false, error: `Please answer the required question: "${question.question}"` }
          }
        }
      }

      if (currentStep === 4) {
        // Validate team-specific questions
        for (const teamId of formData.participant.selectedTeams) {
          const team = currentEvent?.teams?.find(t => t.id === teamId)
          if (!team) continue

          for (const question of team.questions) {
            const teamAnswers = formData.participant.teamAnswers.find(ta => ta.teamId === teamId)
            const answer = teamAnswers?.answers.find(a => a.questionId === question.id)
            if (question.required && (!answer || answer.answer === '' || (Array.isArray(answer.answer) && answer.answer.length === 0))) {
              return { isValid: false, error: `Please answer the required question for ${team.name}: "${question.question}"` }
            }
          }
        }
      }
    }
    return { isValid: true }
  }

  const getTeamSelectionStepIndex = (): number => {
    if (!currentEvent || formData.eventType !== 'recruitment') return -1
    let stepIndex = 2 // Event selection + personal info
    if (currentEvent.commonQuestions && currentEvent.commonQuestions.length > 0) stepIndex++
    return stepIndex
  }

  const getTeamQuestionsStepIndex = (): number => {
    if (!currentEvent || formData.eventType !== 'recruitment') return -1
    return getTeamSelectionStepIndex() + 1
  }

  const getTotalSteps = (): number => {
    if (!currentEvent) return 1
    if (currentEvent.eventType === 'team_registration') {
      return 1 + (currentEvent.teamSize || 1) // Event selection + members
    } else {
      let steps = 2 // Event selection + personal info
      if (currentEvent.commonQuestions && currentEvent.commonQuestions.length > 0) steps++
      steps++ // Team selection
      if (formData.participant?.selectedTeams.length) {
        const hasTeamQuestions = formData.participant.selectedTeams.some(teamId => {
          const team = currentEvent.teams?.find(t => t.id === teamId)
          return team && team.questions && team.questions.length > 0
        })
        if (hasTeamQuestions) steps++
      }
      return steps
    }
  }

  const handleNext = () => {
    const validation = validateCurrentStep()
    if (validation.isValid) {
      setCurrentStep(prev => Math.min(prev + 1, getTotalSteps() - 1))
    } else {
      toast({
        title: "Validation Error",
        description: validation.error || "Please fill in all required fields correctly."
      })
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleRegisterAgain = () => {
    // Clear saved form data
    clearFormData()
    setShowSuccess(false)
    setFormData({
      eventType: currentEvent?.eventType || 'team_registration',
      members: currentEvent?.eventType === 'team_registration' ? getInitialMembers(currentEvent?.teamSize || 1) : undefined,
      participant: currentEvent?.eventType === 'recruitment' ? getInitialParticipant() : undefined,
      eventId: "",
    })
    setCurrentStep(0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateCurrentStep()
    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.error || "Please fill in all required fields correctly."
      })
      return
    }

    setIsSubmitting(true)

    try {
      const submitData: RegistrationFormData = {
        eventType: formData.eventType,
        eventId: formData.eventId,
      }

      if (formData.eventType === 'team_registration' && formData.members) {
        submitData.members = formData.members
      } else if (formData.eventType === 'recruitment' && formData.participant) {
        submitData.participant = formData.participant
      }

      const success = await onSubmit?.(submitData)

      if (success) {
        // Clear saved form data after successful submission
        clearFormData()
        setShowSuccess(true)
        toast({
          title: "Registration Successful!",
          description: `Your registration for ${currentEvent?.name} has been submitted successfully.`,
        })
      } else {
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your registration. Please try again."
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again later."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    if (showSuccess) {
      return <SuccessMessage eventName={currentEvent?.name || "Event"} onRegisterAgain={handleRegisterAgain} />
    }

    if (!currentEvent) return null

    if (currentStep === 0) {
      // Event Selection
      return (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-cyan-300 font-semibold">
            Event Selection
          </h3>
          <SelectField
            id="event"
            label="Select Event"
            icon={Calendar}
            options={events.filter(e => e.isOpen && e._id).map((event) => ({
              value: event._id!,
              label: `${event.name} (${event.eventType === 'team_registration' ? `${event.teamSize} member${event.teamSize! > 1 ? 's' : ''}` : 'Recruitment'})`,
            }))}
            value={formData.eventId}
            onChange={handleEventChange}
            required
          />
          {currentEvent && (
            <div className="text-xs sm:text-sm text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <div className="font-medium mb-1">Event Details:</div>
              <div>Type: {currentEvent.eventType === 'team_registration' ? 'Team Registration' : 'Recruitment'}</div>
              {currentEvent.eventType === 'team_registration' && (
                <div>Team Size: {currentEvent.teamSize} member{currentEvent.teamSize! > 1 ? 's' : ''}</div>
              )}
              {currentEvent.eventType === 'recruitment' && (
                <div>
                  Teams Available: {currentEvent.teams?.length || 0}
                  {currentEvent.allowMultipleTeamSelection && <span className="ml-2">(Multiple selection allowed)</span>}
                </div>
              )}
            </div>
          )}
        </div>
      )
    }

    if (formData.eventType === 'team_registration' && formData.members) {
      // Team Registration - Member Information
      const memberIndex = currentStep - 1
      const member = formData.members[memberIndex]
      if (!member) return null

      return (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-cyan-300 font-semibold">
            Member {memberIndex + 1} Information
          </h3>
          <div className="space-y-4">
            {/* Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                id={`member-${memberIndex}-name`}
                label="Full Name"
                icon={UserIcon}
                placeholder="John Doe"
                value={member.name}
                onChange={(value) => handleMemberChange(memberIndex, "name", value)}
                required
              />
              <InputField
                id={`member-${memberIndex}-registrationNumber`}
                label="Registration Number"
                icon={HashIcon}
                placeholder="RA2011003010000"
                value={member.registrationNumber}
                onChange={(value) => handleMemberChange(memberIndex, "registrationNumber", value)}
                required
              />
            </div>
            {/* Academic Information */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <SelectField
                id={`member-${memberIndex}-year`}
                label="Year"
                icon={GraduationCapIcon}
                options={ACADEMIC_OPTIONS.years}
                value={member.year}
                onChange={(value) => handleMemberChange(memberIndex, "year", value)}
                required
              />
              <SelectField
                id={`member-${memberIndex}-section`}
                label="Section"
                icon={Users}
                options={ACADEMIC_OPTIONS.sections}
                value={member.section}
                onChange={(value) => handleMemberChange(memberIndex, "section", value)}
                required
              />
              <div className="col-span-2 sm:col-span-1">
                <SelectField
                  id={`member-${memberIndex}-branch`}
                  label="Branch"
                  icon={UserSquare}
                  options={ACADEMIC_OPTIONS.branches}
                  value={member.branch}
                  onChange={(value) => handleMemberChange(memberIndex, "branch", value)}
                  required
                />
              </div>
            </div>
            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                id={`member-${memberIndex}-phoneNumber`}
                label="Phone Number"
                icon={Phone}
                type="tel"
                placeholder="1234567890"
                value={member.phoneNumber}
                onChange={(value) => handleMemberChange(memberIndex, "phoneNumber", value)}
                required
              />
              <InputField
                id={`member-${memberIndex}-officialEmail`}
                label="Official Email"
                icon={Mail}
                type="email"
                placeholder="john@srmist.edu.in"
                value={member.officialEmail}
                onChange={(value) => handleMemberChange(memberIndex, "officialEmail", value)}
                required
              />
            </div>
          </div>
        </div>
      )
    }

    if (formData.eventType === 'recruitment' && formData.participant) {
      if (currentStep === 1) {
        // Personal Information
        const participant = formData.participant
        return (
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-cyan-300 font-semibold">
              Personal Information
            </h3>
            <div className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  id="participant-name"
                  label="Full Name"
                  icon={UserIcon}
                  placeholder="John Doe"
                  value={participant.name}
                  onChange={(value) => handleParticipantChange("name", value)}
                  required
                />
                <InputField
                  id="participant-registrationNumber"
                  label="Registration Number"
                  icon={HashIcon}
                  placeholder="RA2011003010000"
                  value={participant.registrationNumber}
                  onChange={(value) => handleParticipantChange("registrationNumber", value)}
                  required
                />
              </div>
              {/* Academic Information */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <SelectField
                  id="participant-year"
                  label="Year"
                  icon={GraduationCapIcon}
                  options={ACADEMIC_OPTIONS.years}
                  value={participant.year}
                  onChange={(value) => handleParticipantChange("year", value)}
                  required
                />
                <SelectField
                  id="participant-section"
                  label="Section"
                  icon={Users}
                  options={ACADEMIC_OPTIONS.sections}
                  value={participant.section}
                  onChange={(value) => handleParticipantChange("section", value)}
                  required
                />
                <div className="col-span-2 sm:col-span-1">
                  <SelectField
                    id="participant-branch"
                    label="Branch"
                    icon={UserSquare}
                    options={ACADEMIC_OPTIONS.branches}
                    value={participant.branch}
                    onChange={(value) => handleParticipantChange("branch", value)}
                    required
                  />
                </div>
              </div>
              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  id="participant-phoneNumber"
                  label="Phone Number"
                  icon={Phone}
                  type="tel"
                  placeholder="1234567890"
                  value={participant.phoneNumber}
                  onChange={(value) => handleParticipantChange("phoneNumber", value)}
                  required
                />
                <InputField
                  id="participant-officialEmail"
                  label="Official Email"
                  icon={Mail}
                  type="email"
                  placeholder="john@srmist.edu.in"
                  value={participant.officialEmail}
                  onChange={(value) => handleParticipantChange("officialEmail", value)}
                  required
                />
              </div>
            </div>
          </div>
        )
      }

      if (currentStep === getTeamSelectionStepIndex()) {
        // Team Selection
        return (
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-cyan-300 font-semibold">
              Team Selection
            </h3>
            <div className="space-y-4">
              {currentEvent.teams?.map((team) => (
                <div key={team.id} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-blue-900/10 rounded-lg border border-gray-200 dark:border-blue-800">
                  <Checkbox
                    id={`team-${team.id}`}
                    checked={formData.participant!.selectedTeams.includes(team.id)}
                    onCheckedChange={(checked) => handleTeamSelection(team.id, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={`team-${team.id}`} className="text-lg font-semibold text-gray-800 dark:text-cyan-300 cursor-pointer">
                      {team.name}
                    </Label>
                    {team.description && (
                      <p className="text-sm text-gray-600 dark:text-blue-300 mt-1">
                        {team.description}
                      </p>
                    )}
                    {team.maxMembers && (
                      <p className="text-xs text-gray-500 dark:text-blue-400 mt-1">
                        Max members: {team.maxMembers}
                      </p>
                    )}
                    {team.questions && team.questions.length > 0 && (
                      <p className="text-xs text-blue-600 dark:text-cyan-400 mt-1">
                        Has {team.questions.length} question{team.questions.length > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }

      if (currentStep === getTeamSelectionStepIndex() + 1 && currentEvent.commonQuestions && currentEvent.commonQuestions.length > 0) {
        // Common Questions
        return (
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-cyan-300 font-semibold">
              General Questions
            </h3>
            <div className="space-y-6">
              {currentEvent.commonQuestions.map((question, index) => {
                const existingAnswer = formData.participant!.commonAnswers.find(a => a.questionId === question.id)
                return (
                  <div key={question.id} className="p-4 bg-gray-50 dark:bg-blue-900/10 rounded-lg border border-gray-200 dark:border-blue-800">
                    <div className="mb-2 text-sm font-medium text-blue-600 dark:text-cyan-400">
                      Question {index + 1}
                    </div>
                    <QuestionField
                      question={{ ...question, type: question.type || 'text', required: question.required || false }}
                      answer={existingAnswer?.answer || ''}
                      onChange={(answer) => handleCommonAnswerChange(question.id, answer)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )
      }

      if (currentStep === getTeamQuestionsStepIndex() && formData.participant.selectedTeams.length > 0) {
        // Team-Specific Questions
        return (
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-cyan-300 font-semibold">
              Team-Specific Questions
            </h3>
            {formData.participant.selectedTeams.map((teamId) => {
              const team = currentEvent.teams?.find(t => t.id === teamId)
              if (!team) return null

              return (
                <div key={teamId} className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 p-3 rounded-lg">
                    <h4 className="text-lg font-semibold text-white">
                      {team.name}
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {team.questions.map((question, index) => {
                      const teamAnswers = formData.participant!.teamAnswers.find(ta => ta.teamId === teamId)
                      const existingAnswer = teamAnswers?.answers.find(a => a.questionId === question.id)
                      return (
                        <div key={question.id} className="p-4 bg-gray-50 dark:bg-blue-900/10 rounded-lg border border-gray-200 dark:border-blue-800">
                          <div className="mb-2 text-sm font-medium text-blue-600 dark:text-cyan-400">
                            Question {index + 1}
                          </div>
                          <QuestionField
                            question={{ ...question, type: question.type || 'text', required: question.required || false }}
                            answer={existingAnswer?.answer || ''}
                            onChange={(answer) => handleTeamAnswerChange(teamId, question.id, answer)}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )
      }
    }

    return null
  }

  // Get open events for the dropdown
  const openEvents = events.filter((event) => event.isOpen)
  const totalSteps = getTotalSteps()
  const isLastStep = currentStep === totalSteps - 1

  if (openEvents.length === 0) {
    return (
      <div className="w-full px-4 py-8 text-center">
        <div className="text-gray-500 dark:text-blue-400 text-lg">
          No events are currently open for registration.
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full px-2 sm:px-3 md:px-4 lg:px-6 min-h-screen py-3 sm:py-4"
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <Card className="bg-white dark:bg-blue-900/20 border-0 md:border md:border-gray-200 md:dark:border-blue-800 shadow-lg dark:shadow-cyan-900/20 rounded-xl overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {!showSuccess && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-blue-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>

                <div className="text-sm text-gray-500 dark:text-blue-400">
                  Step {currentStep + 1} of {totalSteps}
                </div>

                {isLastStep ? (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Submit Registration</span>
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 text-white"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}

            {lastSaved && !showSuccess && (
              <div className="text-xs text-gray-500 dark:text-blue-400 text-center mt-4">
                Auto-saved {lastSaved.toLocaleTimeString()}
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </motion.div>
  )
}