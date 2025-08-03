import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Target, 
  DollarSign, 
  Code, 
  Calendar, 
  TrendingUp,
  Trophy,
  Activity,
  Brain,
  Wallet,
  Plus,
  Edit3,
  CheckCircle2,
  Clock,
  BarChart3,
  Trash2,
  Save,
  X,
  FileText,
  Video,
  Link,
  Upload
} from 'lucide-react';

interface StudyTask {
  id: string;
  subject: string;
  topic: string;
  completed: boolean;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  resources: Resource[];
}

interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'link' | 'notes' | 'excel';
  url?: string;
  description?: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  progress: number;
}

interface FitnessGoal {
  id: string;
  type: 'calisthenics' | 'boxing' | 'gym';
  exercise: string;
  target: string;
  current: string;
  unit: string;
}

interface WorkoutPlan {
  id: string;
  day: string;
  type: string;
  exercises: string[];
  duration: number;
}

interface DietPlan {
  id: string;
  meal: string;
  foods: string[];
  calories: number;
  time: string;
}

interface FinanceEntry {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
}

interface SkillGoal {
  id: string;
  skill: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  resources: Resource[];
  milestones: string[];
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');

  // Study Management State
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Financial Reporting', code: 'FR', progress: 0 },
    { id: '2', name: 'Strategic Financial Management', code: 'SFM', progress: 0 },
    { id: '3', name: 'Advanced Auditing', code: 'Audit', progress: 0 },
    { id: '4', name: 'Corporate Law', code: 'Law', progress: 0 },
    { id: '5', name: 'Advanced Management Accounting', code: 'Costing', progress: 0 },
    { id: '6', name: 'Direct Tax Laws', code: 'DT', progress: 0 },
    { id: '7', name: 'Indirect Tax Laws', code: 'IDT', progress: 0 },
    { id: '8', name: 'Strategic Cost Management', code: 'SCMPE', progress: 0 }
  ]);

  const [studyTasks, setStudyTasks] = useState<StudyTask[]>([
    {
      id: '1',
      subject: 'Financial Reporting',
      topic: 'Ind AS 116 - Leases',
      completed: false,
      dueDate: '2025-01-20',
      priority: 'high',
      resources: [
        { id: '1', name: 'ICAI Study Material Ch 10', type: 'pdf', description: 'Chapter on Leases' },
        { id: '2', name: 'RTP Questions', type: 'pdf', description: 'Practice questions' },
        { id: '3', name: 'Video Lectures', type: 'video', url: 'https://example.com', description: 'Online lectures' }
      ]
    },
    {
      id: '2',
      subject: 'Strategic Financial Management',
      topic: 'Portfolio Management',
      completed: false,
      dueDate: '2025-01-18',
      priority: 'medium',
      resources: [
        { id: '4', name: 'ICAI Study Material Ch 5', type: 'pdf', description: 'Portfolio theory' },
        { id: '5', name: 'Practice Manual', type: 'pdf', description: 'Solved examples' }
      ]
    }
  ]);

  // Fitness State
  const [fitnessGoals, setFitnessGoals] = useState<FitnessGoal[]>([
    { id: '1', type: 'calisthenics', exercise: 'Push-ups', target: '50', current: '25', unit: 'reps' },
    { id: '2', type: 'boxing', exercise: 'Heavy Bag', target: '30', current: '15', unit: 'minutes' },
    { id: '3', type: 'gym', exercise: 'Deadlift', target: '80', current: '60', unit: 'kg' }
  ]);

  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([
    { id: '1', day: 'Monday', type: 'Push Day', exercises: ['Push-ups', 'Bench Press', 'Shoulder Press'], duration: 60 },
    { id: '2', day: 'Tuesday', type: 'Boxing', exercises: ['Heavy Bag', 'Speed Bag', 'Footwork'], duration: 45 },
    { id: '3', day: 'Wednesday', type: 'Pull Day', exercises: ['Pull-ups', 'Rows', 'Deadlifts'], duration: 60 }
  ]);

  const [dietPlans, setDietPlans] = useState<DietPlan[]>([
    { id: '1', meal: 'Breakfast', foods: ['Oats', 'Eggs', 'Fruits'], calories: 450, time: '7:00 AM' },
    { id: '2', meal: 'Lunch', foods: ['Rice', 'Dal', 'Vegetables', 'Chicken'], calories: 650, time: '1:00 PM' },
    { id: '3', meal: 'Snack', foods: ['Protein shake', 'Nuts'], calories: 300, time: '4:00 PM' },
    { id: '4', meal: 'Dinner', foods: ['Salad', 'Fish', 'Quinoa'], calories: 500, time: '8:00 PM' }
  ]);

  // Finance State
  const [financeEntries, setFinanceEntries] = useState<FinanceEntry[]>([
    { id: '1', type: 'income', category: 'Articleship Stipend', amount: 15000, date: '2025-01-01', description: 'Monthly stipend' },
    { id: '2', type: 'expense', category: 'Study Materials', amount: 2500, date: '2025-01-15', description: 'CA Final books' },
    { id: '3', type: 'expense', category: 'Gym Membership', amount: 1200, date: '2025-01-10', description: 'Monthly gym fee' }
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Study Materials', allocated: 5000, spent: 2500 },
    { id: '2', category: 'Fitness', allocated: 2000, spent: 1200 },
    { id: '3', category: 'Food', allocated: 8000, spent: 6500 },
    { id: '4', category: 'Transport', allocated: 3000, spent: 2200 }
  ]);

  // Skills State
  const [skillGoals, setSkillGoals] = useState<SkillGoal[]>([
    { 
      id: '1', 
      skill: 'Python Programming', 
      level: 'beginner', 
      progress: 35, 
      resources: [
        { id: '6', name: 'Python Crash Course', type: 'pdf', description: 'Complete Python guide' },
        { id: '7', name: 'Codecademy', type: 'link', url: 'https://codecademy.com', description: 'Interactive learning' }
      ],
      milestones: ['Variables & Data Types', 'Control Structures', 'Functions', 'OOP Concepts']
    },
    { 
      id: '2', 
      skill: 'AI/ML Fundamentals', 
      level: 'beginner', 
      progress: 15, 
      resources: [
        { id: '8', name: 'Andrew Ng Course', type: 'video', url: 'https://coursera.org', description: 'ML Course' },
        { id: '9', name: 'Kaggle Learn', type: 'link', url: 'https://kaggle.com/learn', description: 'Free courses' }
      ],
      milestones: ['Linear Regression', 'Classification', 'Neural Networks', 'Deep Learning']
    }
  ]);

  // Form states
  const [newTask, setNewTask] = useState({
    subject: '',
    topic: '',
    dueDate: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    resources: [] as Resource[]
  });

  const [newSubject, setNewSubject] = useState({ name: '', code: '' });
  const [newFitnessGoal, setNewFitnessGoal] = useState({
    type: 'gym' as 'calisthenics' | 'boxing' | 'gym',
    exercise: '',
    target: '',
    current: '0',
    unit: 'reps'
  });

  const [newFinanceEntry, setNewFinanceEntry] = useState({
    type: 'expense' as 'income' | 'expense',
    category: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const [newSkill, setNewSkill] = useState({
    skill: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    resources: [] as Resource[],
    milestones: [] as string[]
  });

  // Calculate progress for subjects based on completed tasks
  useEffect(() => {
    const updatedSubjects = subjects.map(subject => {
      const subjectTasks = studyTasks.filter(task => task.subject === subject.name);
      const completedTasks = subjectTasks.filter(task => task.completed);
      const progress = subjectTasks.length > 0 ? (completedTasks.length / subjectTasks.length) * 100 : 0;
      return { ...subject, progress };
    });
    setSubjects(updatedSubjects);
  }, [studyTasks]);

  // Helper functions
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const totalIncome = financeEntries.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = financeEntries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const completedTasks = studyTasks.filter(t => t.completed).length;
  const totalTasks = studyTasks.length;
  const studyProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // CRUD Operations
  const addStudyTask = () => {
    if (newTask.subject && newTask.topic) {
      const task: StudyTask = {
        id: generateId(),
        ...newTask,
        completed: false,
        resources: []
      };
      setStudyTasks([...studyTasks, task]);
      setNewTask({ subject: '', topic: '', dueDate: '', priority: 'medium', resources: [] });
      setShowAddModal(false);
    }
  };

  const addSubject = () => {
    if (newSubject.name && newSubject.code) {
      const subject: Subject = {
        id: generateId(),
        ...newSubject,
        progress: 0
      };
      setSubjects([...subjects, subject]);
      setNewSubject({ name: '', code: '' });
      setShowAddModal(false);
    }
  };

  const deleteStudyTask = (id: string) => {
    setStudyTasks(studyTasks.filter(task => task.id !== id));
  };

  const deleteSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
    // Also remove tasks for this subject
    const subjectToDelete = subjects.find(s => s.id === id);
    if (subjectToDelete) {
      setStudyTasks(studyTasks.filter(task => task.subject !== subjectToDelete.name));
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setStudyTasks(studyTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addFitnessGoal = () => {
    if (newFitnessGoal.exercise && newFitnessGoal.target) {
      const goal: FitnessGoal = {
        id: generateId(),
        ...newFitnessGoal
      };
      setFitnessGoals([...fitnessGoals, goal]);
      setNewFitnessGoal({ type: 'gym', exercise: '', target: '', current: '0', unit: 'reps' });
      setShowAddModal(false);
    }
  };

  const deleteFitnessGoal = (id: string) => {
    setFitnessGoals(fitnessGoals.filter(goal => goal.id !== id));
  };

  const updateFitnessGoal = (id: string, current: string) => {
    setFitnessGoals(fitnessGoals.map(goal => 
      goal.id === id ? { ...goal, current } : goal
    ));
  };

  const addFinanceEntry = () => {
    if (newFinanceEntry.category && newFinanceEntry.amount) {
      const entry: FinanceEntry = {
        id: generateId(),
        ...newFinanceEntry
      };
      setFinanceEntries([...financeEntries, entry]);
      setNewFinanceEntry({
        type: 'expense',
        category: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      setShowAddModal(false);
    }
  };

  const deleteFinanceEntry = (id: string) => {
    setFinanceEntries(financeEntries.filter(entry => entry.id !== id));
  };

  const addSkill = () => {
    if (newSkill.skill) {
      const skill: SkillGoal = {
        id: generateId(),
        ...newSkill,
        progress: 0
      };
      setSkillGoals([...skillGoals, skill]);
      setNewSkill({ skill: '', level: 'beginner', resources: [], milestones: [] });
      setShowAddModal(false);
    }
  };

  const deleteSkill = (id: string) => {
    setSkillGoals(skillGoals.filter(skill => skill.id !== id));
  };

  const updateSkillProgress = (id: string, progress: number) => {
    setSkillGoals(skillGoals.map(skill => 
      skill.id === id ? { ...skill, progress } : skill
    ));
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }: { 
    isOpen: boolean; 
    onClose: () => void; 
    title: string; 
    children: React.ReactNode; 
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const DashboardOverview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          CA Finals Success Platform
        </h1>
        <p className="text-gray-600">Your journey to AIR 1 starts here</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Study Progress</p>
              <p className="text-3xl font-bold">{studyProgress.toFixed(0)}%</p>
              <p className="text-sm text-blue-100">{completedTasks}/{totalTasks} tasks completed</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Fitness Goals</p>
              <p className="text-3xl font-bold">{fitnessGoals.length}</p>
              <p className="text-sm text-green-100">Active goals</p>
            </div>
            <Activity className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Net Savings</p>
              <p className="text-3xl font-bold">₹{(totalIncome - totalExpenses).toLocaleString()}</p>
              <p className="text-sm text-purple-100">This month</p>
            </div>
            <Wallet className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Skill Progress</p>
              <p className="text-3xl font-bold">{Math.round(skillGoals.reduce((sum, skill) => sum + skill.progress, 0) / skillGoals.length)}%</p>
              <p className="text-sm text-orange-100">Average progress</p>
            </div>
            <Brain className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Upcoming Study Tasks
          </h3>
          <div className="space-y-3">
            {studyTasks.filter(task => !task.completed).slice(0, 3).map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{task.topic}</p>
                  <p className="text-sm text-gray-600">{task.subject}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
            Subject Progress
          </h3>
          <div className="space-y-4">
            {subjects.slice(0, 4).map(subject => (
              <div key={subject.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{subject.code}</span>
                  <span className="text-sm text-gray-600">{subject.progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{width: `${subject.progress}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const StudyManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CA Finals Study Management
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => { setModalType('subject'); setShowAddModal(true); }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </button>
          <button 
            onClick={() => { setModalType('task'); setShowAddModal(true); }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {studyTasks.map(task => (
            <div key={task.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="mr-3 w-5 h-5 text-blue-600 rounded"
                    />
                    <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.topic}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-3">{task.subject}</p>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Resources:</h4>
                    <div className="flex flex-wrap gap-2">
                      {task.resources.map((resource) => (
                        <span key={resource.id} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
                          {resource.type === 'pdf' && <FileText className="w-3 h-3 mr-1" />}
                          {resource.type === 'video' && <Video className="w-3 h-3 mr-1" />}
                          {resource.type === 'link' && <Link className="w-3 h-3 mr-1" />}
                          {resource.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                  <button 
                    onClick={() => setEditingItem(task.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteStudyTask(task.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Subjects</h3>
            </div>
            <div className="space-y-4">
              {subjects.map(subject => (
                <div key={subject.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{subject.code}</span>
                      <span className="text-sm text-gray-600">{subject.progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
                        style={{width: `${subject.progress}%`}}
                      ></div>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteSubject(subject.id)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Study Timeline</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Final Exams</span>
                <span className="text-sm text-gray-600">May 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Mock Tests</span>
                <span className="text-sm text-gray-600">Mar 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Revision Start</span>
                <span className="text-sm text-gray-600">Apr 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FitnessTracker = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Fitness Goals
        </h2>
        <button 
          onClick={() => { setModalType('fitness'); setShowAddModal(true); }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fitnessGoals.map(goal => (
          <div key={goal.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{goal.exercise}</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  goal.type === 'calisthenics' ? 'bg-orange-100 text-orange-800' :
                  goal.type === 'boxing' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {goal.type}
                </span>
                <button 
                  onClick={() => deleteFitnessGoal(goal.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Current</span>
                <input 
                  type="number" 
                  value={goal.current}
                  onChange={(e) => updateFitnessGoal(goal.id, e.target.value)}
                  className="w-20 text-right font-medium border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Target</span>
                <span className="font-medium">{goal.target} {goal.unit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300" 
                  style={{width: `${Math.min((parseInt(goal.current) / parseInt(goal.target)) * 100, 100)}%`}}
                ></div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                {Math.min(Math.round((parseInt(goal.current) / parseInt(goal.target)) * 100), 100)}% Complete
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Workout Plans</h3>
          <div className="space-y-3">
            {workoutPlans.map(plan => (
              <div key={plan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">{plan.day} - {plan.type}</span>
                  <p className="text-sm text-gray-600">{plan.exercises.join(', ')}</p>
                </div>
                <span className="text-sm text-gray-500">{plan.duration} min</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Diet Plan</h3>
          <div className="space-y-4">
            {dietPlans.map(diet => (
              <div key={diet.id} className="border-l-4 border-green-500 pl-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{diet.meal}</h4>
                  <span className="text-sm text-gray-500">{diet.time}</span>
                </div>
                <p className="text-sm text-gray-600">{diet.foods.join(', ')}</p>
                <p className="text-xs text-gray-500">{diet.calories} calories</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const FinanceTracker = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Personal Finance
        </h2>
        <button 
          onClick={() => { setModalType('finance'); setShowAddModal(true); }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Total Income</h3>
          <p className="text-3xl font-bold">₹{totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Net Savings</h3>
          <p className="text-3xl font-bold">₹{(totalIncome - totalExpenses).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {financeEntries.map(entry => (
              <div key={entry.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${entry.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="font-medium">{entry.category}</p>
                    <p className="text-sm text-gray-600">{entry.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className={`font-semibold ${entry.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {entry.type === 'income' ? '+' : '-'}₹{entry.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={() => deleteFinanceEntry(entry.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Budget Overview</h3>
          <div className="space-y-4">
            {budgets.map(budget => (
              <div key={budget.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{budget.category}</span>
                  <span className="text-sm text-gray-600">₹{budget.spent}/₹{budget.allocated}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (budget.spent / budget.allocated) > 0.9 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                      (budget.spent / budget.allocated) > 0.7 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                      'bg-gradient-to-r from-green-500 to-green-600'
                    }`}
                    style={{width: `${Math.min((budget.spent / budget.allocated) * 100, 100)}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SkillsDevelopment = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Skills Development
        </h2>
        <button 
          onClick={() => { setModalType('skill'); setShowAddModal(true); }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGoals.map(skill => (
          <div key={skill.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{skill.skill}</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  skill.level === 'beginner' ? 'bg-green-100 text-green-800' :
                  skill.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {skill.level}
                </span>
                <button 
                  onClick={() => deleteSkill(skill.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Progress</span>
                <input 
                  type="number" 
                  value={skill.progress}
                  onChange={(e) => updateSkillProgress(skill.id, parseInt(e.target.value) || 0)}
                  className="w-16 text-right font-medium border border-gray-300 rounded px-2 py-1"
                  min="0"
                  max="100"
                />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-300" 
                  style={{width: `${Math.min(skill.progress, 100)}%`}}
                ></div>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Resources</h4>
              <div className="space-y-1">
                {skill.resources.map((resource) => (
                  <span key={resource.id} className="inline-block px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm mr-1 mb-1 flex items-center">
                    {resource.type === 'pdf' && <FileText className="w-3 h-3 mr-1" />}
                    {resource.type === 'video' && <Video className="w-3 h-3 mr-1" />}
                    {resource.type === 'link' && <Link className="w-3 h-3 mr-1" />}
                    {resource.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Milestones</h4>
              <div className="space-y-1">
                {skill.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-gray-300" />
                    <span className="text-gray-600">{milestone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'study', name: 'Study', icon: BookOpen },
    { id: 'fitness', name: 'Fitness', icon: Activity },
    { id: 'finance', name: 'Finance', icon: DollarSign },
    { id: 'skills', name: 'Skills', icon: Code }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CA Success Hub
              </span>
            </div>
            <div className="flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'study' && <StudyManagement />}
        {activeTab === 'fitness' && <FitnessTracker />}
        {activeTab === 'finance' && <FinanceTracker />}
        {activeTab === 'skills' && <SkillsDevelopment />}
      </main>

      {/* Modals */}
      <Modal 
        isOpen={showAddModal && modalType === 'task'} 
        onClose={() => setShowAddModal(false)}
        title="Add New Study Task"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select 
              value={newTask.subject}
              onChange={(e) => setNewTask({...newTask, subject: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.name}>{subject.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
            <input 
              type="text"
              value={newTask.topic}
              onChange={(e) => setNewTask({...newTask, topic: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter topic name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input 
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select 
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'high' | 'medium' | 'low'})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={addStudyTask}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={showAddModal && modalType === 'subject'} 
        onClose={() => setShowAddModal(false)}
        title="Add New Subject"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
            <input 
              type="text"
              value={newSubject.name}
              onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter subject name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject Code</label>
            <input 
              type="text"
              value={newSubject.code}
              onChange={(e) => setNewSubject({...newSubject, code: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter subject code"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={addSubject}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add Subject
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={showAddModal && modalType === 'fitness'} 
        onClose={() => setShowAddModal(false)}
        title="Add New Fitness Goal"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              value={newFitnessGoal.type}
              onChange={(e) => setNewFitnessGoal({...newFitnessGoal, type: e.target.value as 'calisthenics' | 'boxing' | 'gym'})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="gym">Gym</option>
              <option value="calisthenics">Calisthenics</option>
              <option value="boxing">Boxing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exercise</label>
            <input 
              type="text"
              value={newFitnessGoal.exercise}
              onChange={(e) => setNewFitnessGoal({...newFitnessGoal, exercise: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter exercise name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
            <input 
              type="text"
              value={newFitnessGoal.target}
              onChange={(e) => setNewFitnessGoal({...newFitnessGoal, target: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter target value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <select 
              value={newFitnessGoal.unit}
              onChange={(e) => setNewFitnessGoal({...newFitnessGoal, unit: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="reps">Reps</option>
              <option value="minutes">Minutes</option>
              <option value="kg">Kg</option>
              <option value="lbs">Lbs</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={addFitnessGoal}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Goal
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={showAddModal && modalType === 'finance'} 
        onClose={() => setShowAddModal(false)}
        title="Add New Finance Entry"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              value={newFinanceEntry.type}
              onChange={(e) => setNewFinanceEntry({...newFinanceEntry, type: e.target.value as 'income' | 'expense'})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input 
              type="text"
              value={newFinanceEntry.category}
              onChange={(e) => setNewFinanceEntry({...newFinanceEntry, category: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter category"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input 
              type="number"
              value={newFinanceEntry.amount}
              onChange={(e) => setNewFinanceEntry({...newFinanceEntry, amount: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              type="date"
              value={newFinanceEntry.date}
              onChange={(e) => setNewFinanceEntry({...newFinanceEntry, date: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input 
              type="text"
              value={newFinanceEntry.description}
              onChange={(e) => setNewFinanceEntry({...newFinanceEntry, description: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter description"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={addFinanceEntry}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add Entry
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={showAddModal && modalType === 'skill'} 
        onClose={() => setShowAddModal(false)}
        title="Add New Skill"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
            <input 
              type="text"
              value={newSkill.skill}
              onChange={(e) => setNewSkill({...newSkill, skill: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter skill name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select 
              value={newSkill.level}
              onChange={(e) => setNewSkill({...newSkill, level: e.target.value as 'beginner' | 'intermediate' | 'advanced'})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={addSkill}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Add Skill
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;