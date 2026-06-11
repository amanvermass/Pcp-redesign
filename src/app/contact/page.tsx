"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, FileText, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [inquiryType, setInquiryType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firmName, setFirmName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setInquiryType("");
    setName("");
    setEmail("");
    setFirmName("");
    setMessage("");
    setSubmitted(false);
    setStep(1);
  };

  const handleNext = () => {
    if (step === 1 && !inquiryType) return;
    if (step === 2 && (!name || !email)) return;
    setStep((s) => s + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    setSubmitted(true);
    setStep(4);
  };

  const studios = [
    {
      city: "London Studio",
      address: "72 Clerkenwell Road, London, EC1M 5PX, UK",
      phone: "+44 20 7490 1122"
    },
    {
      city: "New York Studio",
      address: "200 Lexington Avenue, Suite 402, New York, NY 10016, USA",
      phone: "+1 212 683 4500"
    },
    {
      city: "Singapore Studio",
      address: "24 Raffles Place, Clifford Centre, Singapore 048621",
      phone: "+65 6535 8899"
    }
  ];

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 space-y-20 font-sans">
        
        {/* Header Title */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            Connect With Specifiers
          </div>
          <h1 className="heading-premium text-4xl md:text-5xl text-foreground font-semibold">Contact Our Studios</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Submit drawing files, request layout estimation schedules, or schedule physical showroom consultation appointments.
          </p>
        </div>

        {/* Contact Layout (Wizard Form + Studio Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Interactive Multi-step Form Column */}
          <div className="lg:col-span-7 p-8 glass-panel rounded-none border border-border text-left space-y-6 min-h-[380px] flex flex-col justify-between relative overflow-hidden shadow-sm">
            
            {/* Header info inside panel */}
            <div className="flex justify-between items-center pb-4 border-b border-border text-[10px] font-mono text-muted-foreground uppercase">
              <span>Spec Inquiry wizard</span>
              <span>Step {step} of 4</span>
            </div>

            <div className="py-6 flex-1">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Inquiry Type */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="heading-premium text-lg text-foreground">Select inquiry focus</h3>
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      {[
                        { id: "quote", label: "Commercial Project Material Quotation", desc: "Request formal estimates based on blueprints", Icon: FileText },
                        { id: "sample", label: "Material Sample Package Request", desc: "Order physical swatches of clay finishes", Icon: HelpCircle },
                        { id: "support", label: "BIM / CAD Integration Assistance", desc: "Consult engineers on envelope tracks", Icon: HelpCircle }
                      ].map((item) => {
                        const IconComp = item.Icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setInquiryType(item.id);
                              setStep(2);
                            }}
                            className={`p-4 rounded-none border text-left flex gap-3 transition-all cursor-pointer ${
                              inquiryType === item.id
                                ? "bg-primary/5 border-primary text-primary"
                                : "bg-sand border-border text-secondary-foreground hover:border-primary/20 hover:text-primary animate-none"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-none bg-sand flex items-center justify-center shrink-0 text-muted-foreground group-hover:text-primary">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className={`text-xs font-semibold ${inquiryType === item.id ? "text-primary" : "text-foreground"}`}>{item.label}</h4>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Personal details */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="heading-premium text-lg text-foreground">Share your contact details</h3>
                    
                    <div className="space-y-3 pt-2 text-xs">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-muted-foreground uppercase">Your Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Richard Rogers"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-card border border-border rounded-none p-2.5 text-foreground outline-none focus:border-primary transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-muted-foreground uppercase">Corporate Email</label>
                        <input
                          type="email"
                          required
                          placeholder="richard@rogerspartners.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-card border border-border rounded-none p-2.5 text-foreground outline-none focus:border-primary transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-muted-foreground uppercase">Architectural Firm / Agency</label>
                        <input
                          type="text"
                          placeholder="Rogers Stirk Harbour + Partners"
                          value={firmName}
                          onChange={(e) => setFirmName(e.target.value)}
                          className="w-full bg-card border border-border rounded-none p-2.5 text-foreground outline-none focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Message */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="heading-premium text-lg text-foreground">How can our technicians assist you?</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 pt-2 text-xs">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-muted-foreground uppercase">Project description / comments</label>
                        <textarea
                          required
                          rows={5}
                          placeholder="Provide details about structural loads, climate codes, envelope specifications..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-card border border-border rounded-none p-2.5 text-foreground outline-none focus:border-primary transition-all resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-primary hover:bg-brick text-primary-foreground font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer rounded-none"
                      >
                        <Send className="w-4 h-4" />
                        Send Briefing to Advisors
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 4: Success confirmation */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-none bg-primary/10 text-primary flex items-center justify-center mx-auto">
                      <CheckCircle className="w-6 h-6 animate-pulse" />
                    </div>
                    <h3 className="heading-premium text-xl text-foreground">Specification Briefing Logged</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                      A copy of your design details has been sent to our local showroom director. Expect technical logs within 24 hours.
                    </p>
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 bg-card border border-border hover:border-primary hover:text-primary-foreground hover:bg-primary text-xs font-semibold rounded-none transition-colors inline-block mt-4 cursor-pointer"
                    >
                      Log Another Request
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Step Controls */}
            {step < 4 && (
              <div className="flex justify-between items-center pt-4 border-t border-border">
                {step > 1 ? (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary font-mono cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Previous Step
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 text-xs text-primary hover:text-brick font-mono font-semibold cursor-pointer"
                  >
                    Continue
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div />
                )}
              </div>
            )}

          </div>

          {/* Location details column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="heading-premium text-2xl text-foreground">Showroom Design Centers</h3>
            
            <div className="space-y-4">
              {studios.map((st, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-none border border-border bg-card hover:border-primary/50 transition-all duration-300 space-y-3 shadow-sm"
                >
                  <h4 className="text-sm font-semibold text-foreground font-display flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    {st.city}
                  </h4>
                  <div className="space-y-2 text-xs text-muted-foreground font-mono">
                    <p className="leading-relaxed">{st.address}</p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-primary" />
                      <span>{st.phone}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}
