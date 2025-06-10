import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Users, Briefcase, Clock } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  change,
  isPositive
}) => (
  <div className="bg-white/5 rounded-xl p-4">
    <div className="flex items-center justify-between mb-2">
      <div className="text-white/60">{icon}</div>
      <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-white/80 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  // Sample data for charts
  const applicationsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const candidateSourcesData = {
    labels: ['LinkedIn', 'Indeed', 'Referrals', 'Direct', 'Other'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
      },
    ],
  };

  const skillsDemandData = {
    labels: ['React', 'Python', 'Node.js', 'Java', 'AWS', 'Docker'],
    datasets: [
      {
        label: 'Demand',
        data: [85, 75, 65, 60, 55, 50],
        backgroundColor: 'rgba(147, 51, 234, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
    },
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl w-full max-w-6xl mx-auto">
      <div className="flex flex-col h-[85vh] max-h-[700px]">
        {/* Header - Fixed */}
        <div className="mb-6 flex-shrink-0">
          <h2 className="text-2xl font-bold text-white mb-2">Employer Dashboard</h2>
          <p className="text-white/60 text-sm">Comprehensive hiring analytics and insights</p>
        </div>

        {/* Metrics Grid - Fixed */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 flex-shrink-0">
          <MetricCard
            icon={<TrendingUp className="w-5 h-5" />}
            title="Total Applications"
            value="1,234"
            change="+12.5%"
            isPositive={true}
          />
          <MetricCard
            icon={<Users className="w-5 h-5" />}
            title="Active Candidates"
            value="456"
            change="+8.2%"
            isPositive={true}
          />
          <MetricCard
            icon={<Briefcase className="w-5 h-5" />}
            title="Open Positions"
            value="23"
            change="-2.1%"
            isPositive={false}
          />
          <MetricCard
            icon={<Clock className="w-5 h-5" />}
            title="Avg. Time to Hire"
            value="28 days"
            change="-5.3%"
            isPositive={true}
          />
        </div>

        {/* Scrollable Content Area with Invisible Scrollbar */}
        <div 
          className="flex-1 overflow-y-auto pr-4"
          style={{
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer 10+ */
          }}
        >
          {/* Hide scrollbar for WebKit browsers */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          <div className="space-y-6">
            {/* Top Row Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-4">Applications Over Time</h3>
                <div className="h-64">
                  <Line data={applicationsData} options={chartOptions} />
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-4">Candidate Sources</h3>
                <div className="h-64">
                  <Doughnut data={candidateSourcesData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Bottom Chart */}
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-4">Skills in Demand</h3>
              <div className="h-64">
                <Bar data={skillsDemandData} options={chartOptions} />
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Hiring Funnel</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Applications Received</span>
                    <span className="text-white font-semibold">1,234</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Phone Screens</span>
                    <span className="text-white font-semibold">456</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '37%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Final Interviews</span>
                    <span className="text-white font-semibold">123</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Offers Extended</span>
                    <span className="text-white font-semibold">45</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '4%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-white/80 text-sm">New application from Sarah Chen</p>
                      <p className="text-white/60 text-xs">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-white/80 text-sm">Interview scheduled with Alex Johnson</p>
                      <p className="text-white/60 text-xs">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="text-white/80 text-sm">Offer accepted by Maya Patel</p>
                      <p className="text-white/60 text-xs">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="text-white/80 text-sm">New job posting published</p>
                      <p className="text-white/60 text-xs">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Performance */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Team Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">87%</div>
                  <div className="text-white/60 text-sm">Interview Show Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">92%</div>
                  <div className="text-white/60 text-sm">Offer Acceptance Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">4.8</div>
                  <div className="text-white/60 text-sm">Candidate Experience Rating</div>
                </div>
              </div>
            </div>

            {/* Detailed Analytics Section */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Detailed Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white/80 font-medium mb-3">Top Performing Job Posts</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white/80">Senior Frontend Developer</span>
                      <span className="text-green-400 font-semibold">234 applications</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white/80">Product Manager</span>
                      <span className="text-green-400 font-semibold">189 applications</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white/80">DevOps Engineer</span>
                      <span className="text-green-400 font-semibold">156 applications</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white/80 font-medium mb-3">Conversion Rates</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80 text-sm">Application to Phone Screen</span>
                        <span className="text-blue-400 text-sm">37%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: '37%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80 text-sm">Phone Screen to Interview</span>
                        <span className="text-yellow-400 text-sm">27%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '27%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80 text-sm">Interview to Offer</span>
                        <span className="text-green-400 text-sm">37%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: '37%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidate Quality Metrics */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Candidate Quality Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">8.7/10</div>
                  <div className="text-white/60 text-sm">Average Candidate Rating</div>
                  <div className="text-white/40 text-xs mt-1">Based on interview feedback</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">73%</div>
                  <div className="text-white/60 text-sm">Skills Match Rate</div>
                  <div className="text-white/40 text-xs mt-1">Candidates meeting requirements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">4.2 days</div>
                  <div className="text-white/60 text-sm">Avg. Response Time</div>
                  <div className="text-white/40 text-xs mt-1">From application to first contact</div>
                </div>
              </div>
            </div>

            {/* Hiring Trends */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Hiring Trends & Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="text-white font-medium mb-2">🔥 Hot Skills This Month</h4>
                  <p className="text-white/70 text-sm">React, TypeScript, and AWS are the most in-demand skills, with 40% more searches than last month.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="text-white font-medium mb-2">📈 Market Trends</h4>
                  <p className="text-white/70 text-sm">Remote work preferences have increased by 25%. Consider offering hybrid options to attract top talent.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="text-white font-medium mb-2">💡 Optimization Tip</h4>
                  <p className="text-white/70 text-sm">Job posts with salary ranges get 60% more applications. Consider adding compensation details.</p>
                </div>
              </div>
            </div>

            {/* Extra padding for better scrolling */}
            <div className="h-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;