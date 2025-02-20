import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  ChevronDown,
  Star,
  MessageSquare,
  BarChart,
  Globe,
  ArrowRight,
  PlayCircle,
  Check,
} from "lucide-react";

const features = [
  {
    title: "Intelligent Sentiment Analysis",
    description: "Instantly understand customer sentiment and key points.",
    icon: BarChart,
  },
  {
    title: "Smart Reply Suggestions",
    description: "Generate human-like responses tailored to each review.",
    icon: MessageSquare,
  },
  {
    title: "Multi-Channel Integration",
    description: "Seamlessly work across platforms like Google, Yelp, and Facebook.",
    icon: Globe,
  },
  {
    title: "Analytics Dashboard",
    description: "Track performance, trends, and engagement in real-time.",
    icon: BarChart,
  },
];

const steps = [
  {
    title: "Connect Your Reviews",
    description: "Integrate your review channels easily.",
    number: "1",
  },
  {
    title: "AI Analysis",
    description: "Our engine parses and determines sentiment.",
    number: "2",
  },
  {
    title: "Tailored Replies",
    description: "Get suggested responses ready to post.",
    number: "3",
  },
  {
    title: "Engage & Grow",
    description: "Post responses and watch customer satisfaction soar.",
    number: "4",
  },
];

const testimonials = [
  {
    quote: "This tool has revolutionized how we handle customer feedback. The AI suggestions are spot-on!",
    author: "Sarah Johnson",
    title: "Marketing Director",
    company: "TechCorp Inc.",
    rating: 5,
  },
  {
    quote: "We've seen a 40% increase in customer satisfaction since using this platform.",
    author: "Michael Chen",
    title: "Customer Success Manager",
    company: "Retail Solutions",
    rating: 5,
  },
];

const faqs = [
  {
    question: "How does the AI analyze sentiment?",
    answer: "Our advanced AI model analyzes the context, tone, and language patterns in reviews to accurately determine sentiment and key points of feedback.",
  },
  {
    question: "Can I customize the automated responses?",
    answer: "Yes! While our AI generates smart suggestions, you have full control to edit and personalize responses before sending them.",
  },
  {
    question: "Which platforms do you support?",
    answer: "We currently support Google Reviews, Yelp, Facebook, and TripAdvisor, with more platforms being added regularly.",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <Loader className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-lg text-gray-600">Loading amazing things...</p>
        </div>
      </div>
    );
  }

  const handleGetStarted = () => {
    try {
      navigate('/analyzer');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">CommentGuard</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</a>
              <Button onClick={handleGetStarted} variant="outline">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight animate-fade-in">
              Revolutionize Your Customer Engagement
        </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Let our AI analyze and reply to your reviews so you can focus on growing your business.
            </p>
            <div className="mt-10 flex justify-center gap-4 animate-fade-in">
              <Button size="lg" onClick={handleGetStarted} className="text-lg px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch Demo
                <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Powerful Features for Better Engagement
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to manage and improve your online presence
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Get started in minutes with our simple process
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2 transform" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Don't just take our word for it
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Got questions? We've got answers
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border bg-white overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transform transition-transform ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ready to automate your review responses?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Join thousands of businesses already using our platform
            </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
              className="mt-8 text-lg px-8"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">CommentGuard</h3>
              <p className="text-gray-400">
                Revolutionizing customer engagement through AI-powered solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white">How It Works</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CommentGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
