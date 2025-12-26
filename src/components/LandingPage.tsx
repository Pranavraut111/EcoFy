import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [hasSpoken, setHasSpoken] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // EcoFy Buddy Voice - warm, encouraging, friendly
  const speakWelcome = (manual = false) => {
    if ('speechSynthesis' in window && (!hasSpoken || manual)) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(
        "Hello there! I'm EcoFy Buddy, your friendly eco companion. I'm here to help you discover amazing ways to reuse, recycle, and give new life to everyday items. Let's make the planet a little greener together!"
      );
      utterance.rate = 0.8;
      utterance.pitch = 1.3;
      utterance.volume = 0.7;

      const voices = speechSynthesis.getVoices();
      const sweetVoice = voices.find(voice =>
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Susan') ||
        voice.name.includes('Zira') ||
        voice.name.includes('Female') ||
        voice.lang.includes('en-US')
      );
      if (sweetVoice) utterance.voice = sweetVoice;

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
      if (!manual) setHasSpoken(true);
    }
  };

  const speakLaunch = () => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance("Wonderful! Let's see what we can do with your item. Every small action counts!");
      utterance.rate = 0.8;
      utterance.pitch = 1.3;
      utterance.volume = 0.7;

      const voices = speechSynthesis.getVoices();
      const sweetVoice = voices.find(voice =>
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Susan') ||
        voice.name.includes('Zira') ||
        voice.name.includes('Female') ||
        voice.lang.includes('en-US')
      );
      if (sweetVoice) utterance.voice = sweetVoice;

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceButton = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      speakWelcome(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      speakWelcome();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        speechSynthesis.getVoices();
      };
      speechSynthesis.addEventListener('voiceschanged', loadVoices);
      return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    }
  }, []);

  const handleGetStarted = () => {
    speakLaunch();
    setTimeout(() => {
      navigate("/chat");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Voice Control Button */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={handleVoiceButton}
          variant="outline"
          size="icon"
          className={`
            bg-white/80 backdrop-blur-md border-primary/40 hover:border-primary
            transition-all duration-300 rounded-full w-14 h-14 shadow-lg
            ${isSpeaking ? 'animate-pulse bg-primary/20' : 'hover:bg-primary/10'}
          `}
        >
          {isSpeaking ? (
            <VolumeX className="h-6 w-6 text-primary" />
          ) : (
            <Volume2 className="h-6 w-6 text-primary" />
          )}
        </Button>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Text content */}
        <div className="space-y-4 text-center lg:text-left fade-in">
          <div>
            {/* Logo with tagline words */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mb-6">
              <img
                src="/ecofy-logo.png"
                alt="EcoFy Logo"
                className="w-24 h-24 lg:w-36 lg:h-36 bg-white"
              />
              <div className="flex flex-col">
                <span className="text-xl lg:text-3xl font-bold text-primary/80 tracking-wide">Reimagine</span>
                <span className="text-xl lg:text-3xl font-bold text-primary tracking-wide">Recycle</span>
                <span className="text-xl lg:text-3xl font-bold text-secondary tracking-wide">Reuse</span>
              </div>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              EcoFy
            </h1>
            <h2 className="text-xl lg:text-2xl font-extrabold text-primary mt-1">
              Your Friendly Waste Companion
            </h2>
          </div>

          <p className="text-lg lg:text-xl text-gray-600 max-w-xl font-medium">
            Hi! I'm EcoFy Buddy 🌱 Let's see what your waste can become.
            Together, we'll discover creative ways to reuse, recycle, and make a positive impact on our planet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-6 font-bold shadow-xl shadow-primary/30 rounded-xl group"
            >
              Get Started
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/about")}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-6 font-bold rounded-xl"
            >
              How EcoFy Helps
            </Button>
          </div>
        </div>

        {/* Right side - Spline 3D Model */}
        <div className="h-[550px] lg:h-[700px] w-full relative overflow-hidden">
          <iframe
            src='https://my.spline.design/nexbotrobotcharacterconcept-aLx79YpTnJhf8KhYGlRX8ulc/?v=2'
            frameBorder='0'
            width='100%'
            height='100%'
            className="border-0"
            title="EcoFy Buddy - Your Eco Companion"
            style={{ background: 'white' }}
          />
          {/* Cover to hide Spline watermark */}
          <div className="absolute bottom-0 right-0 w-48 h-14 bg-white pointer-events-none z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;