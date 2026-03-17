import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Download, CheckCircle, Briefcase, ArrowLeft, CalendarIcon } from "lucide-react";
import { downloadOfferLetter } from "@/lib/downloadOfferLetter";
import { POSITION_OPTIONS } from "@/lib/positionConfig";
import { COMPANY_OPTIONS } from "@/lib/companyConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import zaplyLogo from "@/assets/zaply-logo.jpg";

const formSchema = z.object({
  candidateName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  candidateAddress: z.string().trim().min(5, "Please enter the candidate's address").max(300),
  candidateEmail: z.string().trim().email("Please enter a valid email address"),
  position: z.string().min(1, "Please select a position"),
  dateOfJoining: z.date({ required_error: "Please select a date of joining" }),
  salary: z.string().trim().min(1, "Please enter the salary amount").max(20),
});

type FormData = z.infer<typeof formSchema>;

export default function OfferLetter() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { candidateName: "", candidateAddress: "", candidateEmail: "", position: "", salary: "20,000" },
  });

  const onSubmit = async (data: FormData) => {
    setDownloading(true);
    await downloadOfferLetter({
      candidateName: data.candidateName,
      candidateAddress: data.candidateAddress,
      candidateEmail: data.candidateEmail,
      position: data.position,
      dateOfJoining: format(data.dateOfJoining, "dd MMMM yyyy"),
      salary: data.salary,
    });
    setDownloading(false);
    setDownloaded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src={zaplyLogo} alt="Zaply Logo" className="h-10 w-auto" />
        </a>
        <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full"
        >
          <Card className="shadow-elevated border-0">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h1 className="font-heading text-xl font-bold text-foreground">
                    Job Offer Letter
                  </h1>
                  <p className="text-muted-foreground text-sm">Generate offer letters for any position</p>
                </div>
              </div>

              {!downloaded ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="candidateName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Candidate Name</FormLabel>
                        <FormControl><Input placeholder="Full name of the candidate" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="candidateAddress" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Candidate Address</FormLabel>
                        <FormControl><Textarea placeholder="Full address of the candidate" rows={2} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="candidateEmail" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Candidate Email</FormLabel>
                        <FormControl><Input type="email" placeholder="candidate@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="position" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position / Designation</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a position" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {POSITION_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="dateOfJoining" render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Joining</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="salary" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Salary (₹)</FormLabel>
                        <div className="flex gap-2">
                          <Select onValueChange={(val) => { if (val !== "custom") field.onChange(val); else field.onChange(""); }}>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Select or type custom" />
                            </SelectTrigger>
                            <SelectContent>
                              {["8,000", "10,000", "12,000", "15,000", "18,000", "20,000", "22,000", "25,000", "28,000", "30,000", "35,000", "40,000", "45,000", "50,000", "60,000", "75,000", "1,00,000"].map((amt) => (
                                <SelectItem key={amt} value={amt}>₹{amt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormControl>
                          <Input placeholder="Or type custom amount (e.g. 27,500)" {...field} className="mt-2" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <Button type="submit" variant="hero" size="lg" className="w-full gap-2 mt-2" disabled={downloading}>
                      <Download className="w-5 h-5" />
                      {downloading ? "Generating PDF..." : "Generate & Download"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <motion.div className="text-center py-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <CheckCircle className="w-14 h-14 text-accent mx-auto mb-3" />
                  <p className="text-foreground font-semibold mb-1">Offer letter downloaded!</p>
                  <p className="text-muted-foreground text-sm mb-6">Check your downloads folder.</p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={() => { setDownloaded(false); form.reset(); }}>
                      New Letter
                    </Button>
                    <Button variant="hero" className="gap-2" onClick={() => form.handleSubmit(onSubmit)()}>
                      <Download className="w-4 h-4" />
                      Download Again
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
