import React, { useState } from 'react';
import { MessageSquare, Mic, Brain, ChevronRight } from 'lucide-react';
import GradientButton from './GradientButton';

interface CoachCardProps {
  onStartSession?: () => void;
  forceExpanded?: boolean;
}

const CoachCard: React.FC<CoachCardProps> = ({ 
  onStartSession = () => {}, 
  forceExpanded = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(forceExpanded);

  // Force expanded state when forceExpanded prop is true
  React.useEffect(() => {
    if (forceExpanded) {
      setIsExpanded(true);
    }
  }, [forceExpanded]);

  const features = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "AI-Powered Insights",
      description: "Get real-time feedback and suggestions during practice interviews"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Smart Questions",
      description: "Access a curated list of industry-specific interview questions"
    },
    {
      icon: <Mic className="w-5 h-5" />,
      title: "Voice Analysis",
      description: "Analyze tone, pace, and clarity of your interview responses"
    }
  ];

  if (!isExpanded && !forceExpanded) {
    return (
      <div className="relative w-[350px]">
        <div className="flex flex-col h-[480px] p-8 rounded-3xl 
                      bg-white/10 backdrop-blur-md border border-white/20
                      shadow-xl shadow-black/20 overflow-hidden">
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white tracking-wide mb-6 text-center
                         text-shadow-glow">AI Interview Coach</h2>
            
            <div className="flex-1 space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-2 bg-white/10 rounded-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-auto flex flex-col items-center space-y-4">
              <GradientButton onClick={() => setIsExpanded(true)}>
                Start Practice Session
              </GradientButton>
              <button 
                onClick={() => setIsExpanded(true)}
                className="text-white/60 hover:text-white text-sm flex items-center space-x-1
                         transition-colors duration-200"
              >
                <span>View More</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                      bg-black/20 blur-md rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="relative w-[700px] max-w-full">
      <div className="flex flex-col h-[80vh] max-h-[600px] p-8 rounded-3xl 
                    bg-white/10 backdrop-blur-md border border-white/20
                    shadow-xl shadow-black/20">
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Fixed Header */}
          <div className="flex justify-between items-center mb-6 flex-shrink-0">
            <h2 className="text-2xl font-bold text-white tracking-wide
                         text-shadow-glow">AI Interview Coach</h2>
            {!forceExpanded && (
              <button
                onClick={() => setIsExpanded(false)}
                className="px-4 py-2 bg-white/10 text-white rounded-xl
                         hover:bg-white/20 transition-colors duration-200"
              >
                Collapse
              </button>
            )}
          </div>

          {/* Scrollable Content Area with Invisible Scrollbar */}
          <div 
            className="flex-1 overflow-y-auto pr-4 space-y-6"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* Internet Explorer 10+ */
            }}
          >
            {/* CSS to hide WebKit scrollbars */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Welcome Message */}
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <h3 className="text-white font-semibold mb-4 text-xl">Welcome to Your AI Interview Coach</h3>
              <p className="text-white/80 mb-6">
                Get ready to ace your next interview with personalized AI-powered coaching. 
                Our advanced system will help you practice, improve, and build confidence.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Interactive</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  <span>Voice Analysis</span>
                </div>
              </div>
            </div>

            {/* Practice Session Setup */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Start a Practice Session</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <select className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2
                                  text-white focus:outline-none focus:border-white/40">
                    <option value="" className="bg-gray-800 text-white">Select Interview Type</option>
                    <option value="technical" className="bg-gray-800 text-white">Technical Interview</option>
                    <option value="behavioral" className="bg-gray-800 text-white">Behavioral Interview</option>
                    <option value="leadership" className="bg-gray-800 text-white">Leadership Interview</option>
                  </select>
                  <select className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2
                                  text-white focus:outline-none focus:border-white/40">
                    <option value="" className="bg-gray-800 text-white">Select Industry</option>
                    <option value="tech" className="bg-gray-800 text-white">Technology</option>
                    <option value="finance" className="bg-gray-800 text-white">Finance</option>
                    <option value="healthcare" className="bg-gray-800 text-white">Healthcare</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <select className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2
                                  text-white focus:outline-none focus:border-white/40">
                    <option value="" className="bg-gray-800 text-white">Select Experience Level</option>
                    <option value="entry" className="bg-gray-800 text-white">Entry Level</option>
                    <option value="mid" className="bg-gray-800 text-white">Mid Level</option>
                    <option value="senior" className="bg-gray-800 text-white">Senior Level</option>
                  </select>
                  <select className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2
                                  text-white focus:outline-none focus:border-white/40">
                    <option value="" className="bg-gray-800 text-white">Select Duration</option>
                    <option value="15" className="bg-gray-800 text-white">15 minutes</option>
                    <option value="30" className="bg-gray-800 text-white">30 minutes</option>
                    <option value="45" className="bg-gray-800 text-white">45 minutes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">What You'll Get</h3>
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-white/10 rounded-lg">
                        {feature.icon}
                      </div>
                      <h4 className="text-white font-medium">{feature.title}</h4>
                    </div>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Tips Section */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Interview Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/70 text-sm">Practice your STAR method responses (Situation, Task, Action, Result)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/70 text-sm">Research the company culture and values beforehand</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/70 text-sm">Prepare thoughtful questions to ask your interviewer</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/70 text-sm">Practice speaking clearly and at a moderate pace</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/70 text-sm">Maintain good eye contact and confident body language</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/70 text-sm">Follow up with a thank-you email within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Recent Sessions</h3>
              <div className="space-y-3">
                {[
                  { type: "Technical Interview Practice", score: 85, time: "2 days ago" },
                  { type: "Behavioral Interview Practice", score: 92, time: "1 week ago" },
                  { type: "Leadership Interview Practice", score: 78, time: "2 weeks ago" },
                  { type: "System Design Interview", score: 88, time: "3 weeks ago" },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">{session.type}</h4>
                      <p className="text-white/60 text-sm">Completed {session.time} • Score: {session.score}%</p>
                    </div>
                    <button className="px-4 py-2 bg-white/10 text-white rounded-lg
                                    hover:bg-white/20 transition-colors duration-200">
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Your Progress</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">12</div>
                  <div className="text-white/60 text-sm">Sessions Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">87%</div>
                  <div className="text-white/60 text-sm">Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">24h</div>
                  <div className="text-white/60 text-sm">Practice Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">5</div>
                  <div className="text-white/60 text-sm">Skills Improved</div>
                </div>
              </div>
            </div>

            {/* Skill Development */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Skill Development Areas</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80 text-sm">Communication Skills</span>
                    <span className="text-green-400 text-sm">92%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80 text-sm">Technical Knowledge</span>
                    <span className="text-blue-400 text-sm">85%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80 text-sm">Problem Solving</span>
                    <span className="text-yellow-400 text-sm">78%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80 text-sm">Leadership Presence</span>
                    <span className="text-purple-400 text-sm">82%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Focus on System Design</h4>
                  <p className="text-white/70 text-sm">Based on your recent sessions, practicing system design questions could improve your technical interview performance by 15%.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Improve Response Structure</h4>
                  <p className="text-white/70 text-sm">Try using the STAR method more consistently in your behavioral responses for clearer communication.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Practice Mock Interviews</h4>
                  <p className="text-white/70 text-sm">Schedule more frequent practice sessions to build confidence and reduce interview anxiety.</p>
                </div>
              </div>
            </div>

            {/* Extra padding for better scrolling */}
            <div className="h-8"></div>
          </div>

          {/* Fixed Bottom Button - Now Centered */}
          <div className="mt-6 flex-shrink-0 flex justify-center">
            <GradientButton onClick={onStartSession}>
              Begin
            </GradientButton>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                    bg-black/20 blur-md rounded-full"></div>
    </div>
  );
};

export default CoachCard;