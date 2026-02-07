// 论文数据
const publicationsData = [
    {
        title: {
            zh: "基于长短期记忆网络的探索性因素分析因子保留方法",
            en: "Exploratory factor retention method based on long short-term memory networks"
        },
        authors: {
            zh: "郭磊, 秦海江",
            en: "Guo, L., & Qin, H. J."
        },
        journal: {
            zh: "心理学报",
            en: "Acta Psychologica Sinica"
        },
        year: "2026",
        volume: "57",
        issue: "3",
        pages: "1-11",
        doi: "10.3724/SP.J.1041.2026.0558",
        contrib: {
            zh: "(心理学中文旗舰, 该论文以LSTM提高了探索性因子分析保留因子的准确性)",
            en: "(Flagship journal in Chinese psychology. This paper improves the accuracy of factor retention in exploratory factor analysis using LSTM)"
        }
    },
    {
        title: {
            zh: "Priority attribute algorithm for Q-matrix validation: A didactic",
            en: "Priority attribute algorithm for Q-matrix validation: A didactic"
        },
        authors: {
            zh: "Qin, H., & Guo, L.",
            en: "Qin, H., & Guo, L."
        },
        journal: {
            zh: "Behavior Research Methods",
            en: "Behavior Research Methods"
        },
        year: "2025",
        volume: "57",
        issue: "1",
        pages: "31",
        doi: "10.3758/s13428-024-02547-5",
        contrib: {
            zh: "(中科院一区，SSCI, 该论文提出属性优先算法大幅降低认知诊断领域修正Q矩阵的搜索复杂度，由O(2^K)降至O(K))",
            en: "(CAS Q1, SSCI. This paper proposes the Priority Attribute Algorithm that significantly reduces the search complexity for Q-matrix validation in cognitive diagnosis from O(2^K) to O(K))"
        }
    },
    {
        title: {
            zh: "基于信号检测论的认知诊断评估：构建与应用",
            en: "Cognitive diagnosis assessment based on signal detection theory: Construction and application"
        },
        authors: {
            zh: "郭磊, 秦海江",
            en: "Guo, L., & Qin, H. J."
        },
        journal: {
            zh: "心理学报",
            en: "Acta Psychologica Sinica"
        },
        year: "2024",
        volume: "56",
        issue: "3",
        pages: "339-351",
        doi: "10.3724/SP.J.1041.2024.00339", 
        contrib: {
            zh: "(心理学中文旗舰, 该论文将信号检测论与认知诊断结合，提出适合选择题测验数据的认知诊断模型)",
            en: "(Flagship journal in Chinese psychology. This paper integrates signal detection theory with cognitive diagnosis to propose a model suitable for multiple-choice test data)"
        }
    },
    {
        title: {
            zh: "Using machine learning to improve Q-matrix validation",
            en: "Using machine learning to improve Q-matrix validation"
        },
        authors: {
            zh: "Qin, H., & Guo, L.",
            en: "Qin, H., & Guo, L."
        },
        journal: {
            zh: "Behavior Research Methods",
            en: "Behavior Research Methods"
        },
        year: "2024",
        volume: "56",
        issue: "3",
        pages: "1916-1935",
        doi: "10.3758/s13428-023-02126-0",
        contrib: {
            zh: "(中科院一区，SSCI，该论文利用随机森林、多层感知器等提高了认知诊断领域Q矩阵修正的准确性)",
            en: "(CAS Q1, SSCI. This paper leverages random forests and multilayer perceptrons to improve the accuracy of Q-matrix validation in cognitive diagnosis)"
        }
    },
    {
        title: {
            zh: "高中平面向量的认知诊断研究",
            en: "An Empirical Research of Cognitive Diagnosis for Two-Dimensional Vector in High School"
        },
        authors: {
            zh: "秦海江, 霍学晨, & 郭磊",
            en: "Qin, H. J., Huo, X. C., & Guo, L."
        },
        journal: {
            zh: "数学教育学报",
            en: "Journal of Mathematics Education"
        },
        year: "2024",
        volume: "33",
        issue: "02",
        pages: "1-7",
        url: "https://www.cnki.net/",
        contrib: {
            zh: "(数学教育旗舰，该论文进行认知诊断实证数据，对如何在教育测验中进行认知诊断以促进教育实效进行了讨论)",
            en: "(Flagship journal in mathematics education. This paper presents empirical data on cognitive diagnosis and discusses how to implement cognitive diagnosis in educational testing to enhance educational effectiveness)"
        }
    },
    {
        title: {
            zh: "基于随机森林的认知诊断Q矩阵修正",
            en: "New Methods for Q-matrix Validation Based on Random Forest"
        },
        authors: {
            zh: "秦海江, 郭磊",
            en: "Qin, H., & Guo, L."
        },
        journal: {
            zh: "心理技术与应用",
            en: "Psychology：Techniques and Applications"
        },
        year: "2024",
        volume: "11",
        issue: "11",
        pages: "685-704",
        url: "https://www.cnki.net/",
        contrib: {
            zh: "(该论文使用R^2和似然对随机森林进行训练，提高了Q矩阵修正的准确率)",
            en: "(This paper uses R^2 and likelihood to train random forests, improving the accuracy of Q-matrix validation)"
        }
    }
];
