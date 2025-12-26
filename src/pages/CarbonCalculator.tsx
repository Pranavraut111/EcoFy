import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
    Leaf,
    Car,
    Zap,
    UtensilsCrossed,
    Trash2,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    TrendingDown,
    Home,
    Bike,
    Train,
    Plane
} from "lucide-react";
import CarbonResult from "@/components/carbon/CarbonResult";

interface Answers {
    transport: string;
    carMiles: number;
    flights: string;
    electricity: number;
    diet: string;
    waste: string;
}

const CarbonCalculator = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [answers, setAnswers] = useState<Answers>({
        transport: "mixed",
        carMiles: 50,
        flights: "none",
        electricity: 50,
        diet: "omnivore",
        waste: "some"
    });

    const steps = [
        {
            title: "Transportation",
            icon: <Car className="w-6 h-6" />,
            question: "How do you usually get around?"
        },
        {
            title: "Air Travel",
            icon: <Plane className="w-6 h-6" />,
            question: "How often do you fly per year?"
        },
        {
            title: "Energy",
            icon: <Zap className="w-6 h-6" />,
            question: "How's your electricity usage at home?"
        },
        {
            title: "Diet",
            icon: <UtensilsCrossed className="w-6 h-6" />,
            question: "What's your typical diet?"
        },
        {
            title: "Waste",
            icon: <Trash2 className="w-6 h-6" />,
            question: "How do you handle waste?"
        }
    ];

    const calculateFootprint = (): number => {
        let total = 0;

        // Transport
        if (answers.transport === "car") total += 4.5;
        else if (answers.transport === "mixed") total += 2.5;
        else if (answers.transport === "public") total += 1.5;
        else total += 0.5;

        // Car miles
        total += (answers.carMiles / 100) * 0.5;

        // Flights
        if (answers.flights === "frequent") total += 3;
        else if (answers.flights === "occasional") total += 1.5;
        else if (answers.flights === "rare") total += 0.5;

        // Electricity
        total += (answers.electricity / 100) * 2;

        // Diet
        if (answers.diet === "omnivore") total += 2.5;
        else if (answers.diet === "pescatarian") total += 1.8;
        else if (answers.diet === "vegetarian") total += 1.2;
        else total += 0.8;

        // Waste
        if (answers.waste === "none") total += 1.5;
        else if (answers.waste === "some") total += 1;
        else if (answers.waste === "most") total += 0.5;
        else total += 0.2;

        return Math.round(total * 10) / 10;
    };

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    if (showResults) {
        return <CarbonResult footprint={calculateFootprint()} answers={answers} onReset={() => { setShowResults(false); setStep(0); }} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-green-100 py-4 px-6 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => navigate("/")}
                    >
                        <img src="/ecofy-logo.png" alt="EcoFy" className="w-10 h-10" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                            EcoFy
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/chat")}
                        className="text-green-700 hover:bg-green-100"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Chat
                    </Button>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* Hero */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-sm font-medium">Measure Your Impact</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Carbon Footprint Calculator 🌍
                    </h1>
                    <p className="text-lg text-gray-600">
                        Discover your environmental impact and get personalized tips to reduce it.
                    </p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                className={`flex flex-col items-center ${i <= step ? "text-green-600" : "text-gray-300"}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${i < step ? "bg-green-500 text-white" :
                                        i === step ? "bg-green-100 text-green-600 ring-2 ring-green-500" :
                                            "bg-gray-100"
                                    }`}>
                                    {i < step ? <CheckCircle2 className="w-5 h-5" /> : s.icon}
                                </div>
                                <span className="text-xs font-medium hidden md:block">{s.title}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        {steps[step].icon}
                        {steps[step].question}
                    </h2>

                    {/* Step 0: Transport */}
                    {step === 0 && (
                        <RadioGroup
                            value={answers.transport}
                            onValueChange={(v) => setAnswers({ ...answers, transport: v })}
                            className="space-y-3"
                        >
                            {[
                                { value: "car", label: "Mostly car", icon: <Car className="w-5 h-5" />, desc: "Daily driving" },
                                { value: "mixed", label: "Mix of car & public", icon: <Train className="w-5 h-5" />, desc: "Both options" },
                                { value: "public", label: "Mostly public transit", icon: <Train className="w-5 h-5" />, desc: "Bus, train, metro" },
                                { value: "bike", label: "Bike or walk", icon: <Bike className="w-5 h-5" />, desc: "Active transport" },
                            ].map((opt) => (
                                <Label
                                    key={opt.value}
                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${answers.transport === opt.value
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-green-300"
                                        }`}
                                >
                                    <RadioGroupItem value={opt.value} />
                                    <div className="text-green-600">{opt.icon}</div>
                                    <div>
                                        <p className="font-medium text-gray-800">{opt.label}</p>
                                        <p className="text-sm text-gray-500">{opt.desc}</p>
                                    </div>
                                </Label>
                            ))}
                        </RadioGroup>
                    )}

                    {/* Step 1: Flights */}
                    {step === 1 && (
                        <RadioGroup
                            value={answers.flights}
                            onValueChange={(v) => setAnswers({ ...answers, flights: v })}
                            className="space-y-3"
                        >
                            {[
                                { value: "frequent", label: "Frequent flyer", desc: "5+ flights per year" },
                                { value: "occasional", label: "Occasional flights", desc: "2-4 flights per year" },
                                { value: "rare", label: "Rare flights", desc: "1 flight per year" },
                                { value: "none", label: "No flights", desc: "I avoid air travel" },
                            ].map((opt) => (
                                <Label
                                    key={opt.value}
                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${answers.flights === opt.value
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-green-300"
                                        }`}
                                >
                                    <RadioGroupItem value={opt.value} />
                                    <div>
                                        <p className="font-medium text-gray-800">{opt.label}</p>
                                        <p className="text-sm text-gray-500">{opt.desc}</p>
                                    </div>
                                </Label>
                            ))}
                        </RadioGroup>
                    )}

                    {/* Step 2: Electricity */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Home className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-600">Low Usage</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">High Usage</span>
                                    <Zap className="w-5 h-5 text-yellow-500" />
                                </div>
                            </div>
                            <Slider
                                value={[answers.electricity]}
                                onValueChange={(v) => setAnswers({ ...answers, electricity: v[0] })}
                                max={100}
                                step={10}
                                className="w-full"
                            />
                            <p className="text-center text-gray-600">
                                Your usage: <span className="font-bold text-green-600">
                                    {answers.electricity < 30 ? "Low 🌿" : answers.electricity < 70 ? "Average ⚡" : "High 🔌"}
                                </span>
                            </p>
                        </div>
                    )}

                    {/* Step 3: Diet */}
                    {step === 3 && (
                        <RadioGroup
                            value={answers.diet}
                            onValueChange={(v) => setAnswers({ ...answers, diet: v })}
                            className="space-y-3"
                        >
                            {[
                                { value: "omnivore", label: "Omnivore", desc: "Regular meat consumption" },
                                { value: "pescatarian", label: "Pescatarian", desc: "Fish but no meat" },
                                { value: "vegetarian", label: "Vegetarian", desc: "No meat or fish" },
                                { value: "vegan", label: "Vegan", desc: "Fully plant-based" },
                            ].map((opt) => (
                                <Label
                                    key={opt.value}
                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${answers.diet === opt.value
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-green-300"
                                        }`}
                                >
                                    <RadioGroupItem value={opt.value} />
                                    <div>
                                        <p className="font-medium text-gray-800">{opt.label}</p>
                                        <p className="text-sm text-gray-500">{opt.desc}</p>
                                    </div>
                                </Label>
                            ))}
                        </RadioGroup>
                    )}

                    {/* Step 4: Waste */}
                    {step === 4 && (
                        <RadioGroup
                            value={answers.waste}
                            onValueChange={(v) => setAnswers({ ...answers, waste: v })}
                            className="space-y-3"
                        >
                            {[
                                { value: "none", label: "Don't recycle", desc: "Everything goes in trash" },
                                { value: "some", label: "Some recycling", desc: "Recycle when convenient" },
                                { value: "most", label: "Active recycler", desc: "Separate most waste" },
                                { value: "zero", label: "Zero-waste lifestyle", desc: "Compost, reuse, minimal trash" },
                            ].map((opt) => (
                                <Label
                                    key={opt.value}
                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${answers.waste === opt.value
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-green-300"
                                        }`}
                                >
                                    <RadioGroupItem value={opt.value} />
                                    <div>
                                        <p className="font-medium text-gray-800">{opt.label}</p>
                                        <p className="text-sm text-gray-500">{opt.desc}</p>
                                    </div>
                                </Label>
                            ))}
                        </RadioGroup>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={step === 0}
                        className="gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                    <Button
                        onClick={handleNext}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 gap-2"
                    >
                        {step === steps.length - 1 ? "See Results" : "Next"}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CarbonCalculator;
