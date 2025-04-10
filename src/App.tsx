import React, { useState } from 'react';
import { ChevronRight, Star, Download, Shield, Globe, DollarSign, MessageCircle, HelpCircle, ArrowLeft } from 'lucide-react';
import { jsPDF } from 'jspdf';

// MBTI questions with comprehensive test items
const questions = [
  {
    id: 1,
    question: "你更倾向于在社交场合：",
    questionEn: "In social situations, you tend to:",
    options: [
      { text: "主动与他人交谈", textEn: "Initiate conversations with others", score: "E" },
      { text: "等待他人来与你交谈", textEn: "Wait for others to approach you", score: "I" }
    ]
  },
  {
    id: 2,
    question: "在做决定时，你通常：",
    questionEn: "When making decisions, you usually:",
    options: [
      { text: "依靠逻辑和事实", textEn: "Rely on logic and facts", score: "T" },
      { text: "考虑他人感受", textEn: "Consider others' feelings", score: "F" }
    ]
  },
  {
    id: 3,
    question: "你更喜欢：",
    questionEn: "You prefer:",
    options: [
      { text: "计划和安排", textEn: "Planning and scheduling", score: "J" },
      { text: "随机应变", textEn: "Going with the flow", score: "P" }
    ]
  },
  {
    id: 4,
    question: "在获取信息时，你更倾向于：",
    questionEn: "When gathering information, you tend to:",
    options: [
      { text: "关注具体细节", textEn: "Focus on specific details", score: "S" },
      { text: "寻找潜在联系", textEn: "Look for potential connections", score: "N" }
    ]
  },
  {
    id: 5,
    question: "在团队工作中，你更喜欢：",
    questionEn: "In team work, you prefer:",
    options: [
      { text: "与他人深入讨论", textEn: "Having in-depth discussions", score: "E" },
      { text: "独立思考后再分享", textEn: "Thinking independently before sharing", score: "I" }
    ]
  },
  {
    id: 6,
    question: "面对问题时，你更倾向于：",
    questionEn: "When facing problems, you tend to:",
    options: [
      { text: "寻找创新的解决方案", textEn: "Look for innovative solutions", score: "N" },
      { text: "使用已证实的方法", textEn: "Use proven methods", score: "S" }
    ]
  },
  {
    id: 7,
    question: "在做项目时，你更喜欢：",
    questionEn: "When working on projects, you prefer:",
    options: [
      { text: "按步就班地完成", textEn: "Following a structured approach", score: "J" },
      { text: "灵活调整计划", textEn: "Adapting plans as you go", score: "P" }
    ]
  },
  {
    id: 8,
    question: "在评估方案时，你更看重：",
    questionEn: "When evaluating options, you prioritize:",
    options: [
      { text: "客观的分析", textEn: "Objective analysis", score: "T" },
      { text: "对人的影响", textEn: "Impact on people", score: "F" }
    ]
  }
];

const mbtiDescriptions: Record<string, { title: string, description: string, careers: string[], strengths: string[], improvements: string[] }> = {
  'INTJ': {
    title: '建筑师',
    description: '具有创新思维的战略家，擅长制定复杂系统和理论性思考。追求持续改进和完美。',
    careers: ['战略分析师', '科学研究员', '系统架构师', '投资顾问', '企业顾问'],
    strengths: ['战略思维', '独立工作能力', '创新能力', '分析技能', '目标导向'],
    improvements: ['情感表达', '团队协作', '处理日常细节', '接受他人意见', '耐心倾听']
  },
  'INTP': {
    title: '逻辑学家',
    description: '富有创造力的发明家，对理论和抽象概念有浓厚兴趣。寻求逻辑解释和创新方案。',
    careers: ['软件开发', '数据分析', '研究工作', '系统设计', '学术研究'],
    strengths: ['逻辑思维', '问题解决', '创新思维', '概念分析', '独立研究'],
    improvements: ['执行力', '情感交流', '时间管理', '实践操作', '团队合作']
  },
  // ... 其他MBTI类型的描述（为简洁起见省略）
};

function App() {
  const [currentStep, setCurrentStep] = useState('landing'); // landing, test, payment, result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const testimonials = [
    {
      name: "张明",
      role: "软件工程师",
      content: "这是我用过最专业的MBTI测试平台，结果非常准确！",
      rating: 5
    },
    {
      name: "李华",
      role: "市场经理",
      content: "详细的分析报告帮助我更好地了解自己，推荐给所有人。",
      rating: 5
    },
    {
      name: "王芳",
      role: "教师",
      content: "测试题目设计得很科学，报告内容很有参考价值。",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "专业认证",
      description: "采用国际标准的MBTI评估体系"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "中英双语",
      description: "支持中英文完整测试体验"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "详细报告",
      description: "提供深度个性分析和职业建议"
    }
  ];

  const faqs = [
    {
      question: "什么是MBTI测试？",
      answer: "MBTI（迈尔斯-布里格斯类型指标）是一种性格类型评估工具，帮助人们更好地理解自己的性格特征和行为模式。"
    },
    {
      question: "测试需要多长时间？",
      answer: "完成测试通常需要15-20分钟。为了获得最准确的结果，建议在安静的环境下专注完成。"
    },
    {
      question: "测试结果准确吗？",
      answer: "我们的测试基于科学的MBTI理论，采用专业的评估算法，确保结果的准确性和可靠性。"
    }
  ];

  const handleAnswer = (score: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: score
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate MBTI type and show payment screen
      setCurrentStep('payment');
    }
  };

  const calculateMBTIType = () => {
    let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;

    Object.values(answers).forEach(score => {
      switch (score) {
        case 'E': E++; break;
        case 'I': I++; break;
        case 'S': S++; break;
        case 'N': N++; break;
        case 'T': T++; break;
        case 'F': F++; break;
        case 'J': J++; break;
        case 'P': P++; break;
      }
    });

    return `${E > I ? 'E' : 'I'}${S > N ? 'S' : 'N'}${T > F ? 'T' : 'F'}${J > P ? 'J' : 'P'}`;
  };

  const generatePDF = () => {
    const mbtiType = calculateMBTIType();
    const typeInfo = mbtiDescriptions[mbtiType] || {
      title: '未知类型',
      description: '暂无描述',
      careers: [],
      strengths: [],
      improvements: []
    };

    const doc = new jsPDF();
    
    // 设置中文字体
    doc.setFont('helvetica');
    
    // 标题
    doc.setFontSize(24);
    doc.text('MBTI 个性化分析报告', 105, 20, { align: 'center' });
    
    // 类型和描述
    doc.setFontSize(16);
    doc.text(`您的MBTI类型：${mbtiType} - ${typeInfo.title}`, 20, 40);
    
    doc.setFontSize(12);
    doc.text('性格描述：', 20, 55);
    const descriptionLines = doc.splitTextToSize(typeInfo.description, 170);
    doc.text(descriptionLines, 20, 65);
    
    // 职业建议
    doc.text('推荐职业：', 20, 90);
    typeInfo.careers.forEach((career, index) => {
      doc.text(`• ${career}`, 30, 100 + (index * 10));
    });
    
    // 优势
    doc.text('个人优势：', 20, 150);
    typeInfo.strengths.forEach((strength, index) => {
      doc.text(`• ${strength}`, 30, 160 + (index * 10));
    });
    
    // 改进建议
    doc.text('改进建议：', 20, 210);
    typeInfo.improvements.forEach((improvement, index) => {
      doc.text(`• ${improvement}`, 30, 220 + (index * 10));
    });
    
    // 保存PDF
    doc.save(`MBTI-${mbtiType}-报告.pdf`);
  };

  const renderTestInterface = () => (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1);
                } else {
                  setCurrentStep('landing');
                }
              }}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回
            </button>
          </div>
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-600 mt-2">
              {currentQuestion + 1} / {questions.length}
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">{questions[currentQuestion].question}</h2>
          <p className="text-gray-600 mb-8">{questions[currentQuestion].questionEn}</p>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.score)}
                className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="font-medium">{option.text}</div>
                <div className="text-gray-600 text-sm">{option.textEn}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="container mx-auto max-w-md">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">完成测试</h2>
          <p className="text-gray-600 mb-8">
            您的MBTI类型是：{calculateMBTIType()}
            <br />
            支付后即可获取详细的个性化分析报告
          </p>
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1672908116619-915a80111c0c"
              alt="支付二维码"
              className="w-48 h-48 mx-auto rounded-lg shadow-sm"
            />
          </div>
          <p className="text-xl font-bold mb-4">¥10</p>
          <button
            onClick={generatePDF}
            className="w-full bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            确认支付并下载报告
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 'test':
        return renderTestInterface();
      case 'payment':
        return renderPayment();
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4">
              <div className="container mx-auto text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  探索你的性格类型
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  通过专业的MBTI测试，深入了解自己的性格特征，获取个性化的职业发展建议
                </p>
                <button
                  onClick={() => setCurrentStep('test')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center mx-auto"
                >
                  开始测试
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </section>

            {/* Features */}
            <section id="features" className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">功能特色</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="text-blue-600 mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">用户评价</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4">{testimonial.content}</p>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-gray-500 text-sm">{testimonial.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">测试定价</h2>
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-4">¥10</div>
                    <p className="text-gray-600 mb-6">专业MBTI性格分析报告</p>
                    <ul className="text-left space-y-4 mb-8">
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-green-500 mr-2" />
                        详细的性格特征分析
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-green-500 mr-2" />
                        个性化的职业发展建议
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-green-500 mr-2" />
                        人际关系指导
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-green-500 mr-2" />
                        PDF格式报告下载
                      </li>
                    </ul>
                    <button
                      onClick={() => setCurrentStep('test')}
                      className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors w-full"
                    >
                      立即开始
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">常见问题</h2>
                <div className="max-w-2xl mx-auto space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="text-xl font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full bg-white shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">RL测试网</div>
          <div className="flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">功能特色</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">定价</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900">常见问题</a>
          </div>
        </nav>
      </header>

      {renderContent()}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RL测试网</h3>
              <p className="text-gray-400">专业的MBTI性格测试平台</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">功能特色</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white">定价</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white">常见问题</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">联系我们</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">客服邮箱：support@rltest.com</li>
                <li className="text-gray-400">工作时间：周一至周日 9:00-21:00</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">关注我们</h4>
              <div className="flex space-x-4">
                <MessageCircle className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Globe className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 RL测试网. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;