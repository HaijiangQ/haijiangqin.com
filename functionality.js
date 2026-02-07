document.addEventListener('DOMContentLoaded', function() {
    // 初始化Chart.js图表
    let statsChart = null;

    // 语言切换功能
    const langToggle = document.getElementById('langToggle');
    const langIndicator = langToggle.querySelector('.lang-indicator');
    let currentLang = localStorage.getItem('preferredLang') || 'zh';
    
    // 初始化语言
    setLanguage(currentLang);
    
    // 监听语言切换
    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        setLanguage(currentLang);
        localStorage.setItem('preferredLang', currentLang);
    });
    
    // 设置语言
    function setLanguage(lang) {
        // 更新语言切换按钮
        if (lang === 'zh') {
            langToggle.querySelector('span').textContent = '中文';
            langIndicator.style.background = '#2ecc71';
        } else {
            langToggle.querySelector('span').textContent = 'English';
            langIndicator.style.background = '#3498db';
        }

        document.querySelectorAll('.skills-container .skill-tag').forEach(tag => {
            if (lang === 'zh' && tag.hasAttribute('data-zh')) {
                tag.textContent = tag.getAttribute('data-zh');
            } else if (lang === 'en' && tag.hasAttribute('data-en')) {
                tag.textContent = tag.getAttribute('data-en');
            }
        });
        
        // 切换论文显示
        document.querySelectorAll('.apa-chinese').forEach(el => el.style.display = lang === 'zh' ? 'block' : 'none');
        document.querySelectorAll('.apa-english').forEach(el => el.style.display = lang === 'en' ? 'block' : 'none');
        
        // 更新所有可翻译元素
        document.querySelectorAll('[data-zh]').forEach(el => {
            if (lang === 'zh' && el.hasAttribute('data-zh')) {
                if (el.tagName === 'TITLE') {
                    document.title = el.getAttribute('data-zh');
                } else {
                    el.textContent = el.getAttribute('data-zh');
                }
            } else if (lang === 'en' && el.hasAttribute('data-en')) {
                if (el.tagName === 'TITLE') {
                    document.title = el.getAttribute('data-en');
                } else {
                    el.textContent = el.getAttribute('data-en');
                }
            }
        });
        
        // 重新渲染软件和出版物
        renderSoftware();
        renderPublications();
        
        // 特殊处理APA英文格式
        document.querySelectorAll('.apa-english').forEach(el => {
            if (lang === 'en') {
                el.style.fontFamily = "'Times New Roman', Times, serif";
            } else {
                el.style.fontFamily = "inherit";
            }
        });
        
        // 特殊处理贡献详情的样式
        document.querySelectorAll('.contrib-details').forEach(el => {
            if (lang === 'en') {
                el.style.fontStyle = 'italic';
                el.style.fontSize = '0.95rem';
            } else {
                el.style.fontStyle = 'italic';
                el.style.fontSize = '0.95rem';
            }
        });
    }

    // 渲染软件列表
    function renderSoftware() {
        const container = document.getElementById('softwareContainer');
        container.innerHTML = '';
        
        softwareData.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'software-item';
            if (index < 2) div.classList.add('visible'); // 默认显示前2个
            
            const descText = currentLang === 'zh' ? item.description.zh : item.description.en;
            const typeText = currentLang === 'zh' ? 
                (item.type === 'R package' ? '(开源 R 软件)' : '(开源 Python 库)') : 
                (item.type === 'R package' ? '(Open-source R package)' : '(Open-source Python library)');
            
            div.innerHTML = `
                <div class="software-name">
                    <i class="fas fa-${item.type === 'R package' ? 'r-project' : 'python'}"></i> ${item.name}
                </div>
                <div class="software-meta">${item.authors} (${item.year}). ${item.type === 'R package' ? 'R package' : 'Python library'} version ${item.version}</div>
                <div class="software-link">
                    <a href="${item.link}" target="_blank" class="paper-link">
                        <i class="fas fa-link"></i> ${item.link}
                    </a>
                </div>
                <div class="software-description">${descText}</div>
                <div class="contrib-details">${typeText}</div>
            `;
            
            container.appendChild(div);
        });
        
        // 更新统计数字
        document.getElementById('openSourcePackagesCount').textContent = softwareData.length;
        
        // 更新按钮状态
        updateSoftwareButtonVisibility();
        
        // 更新图表
        updateChart();
    }

    // 渲染出版物列表
    function renderPublications() {
        const container = document.getElementById('publicationsContainer');
        container.innerHTML = '';
        
        publicationsData.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'paper-item';
            if (index < 3) div.classList.add('visible');
            
            const title = currentLang === 'zh' ? item.title.zh : item.title.en;
            const authors = currentLang === 'zh' ? item.authors.zh : item.authors.en;
            const journal = currentLang === 'zh' ? item.journal.zh : item.journal.en;
            const contrib = currentLang === 'zh' ? item.contrib.zh : item.contrib.en;
            
            let metaContent = `${item.year}, ${item.volume}(${item.issue}), ${item.pages}.`;
            let linkContent = '';
            
            if (item.doi) {
                linkContent = `<a href="https://doi.org/${item.doi}" target="_blank" class="paper-link">
                    <i class="fas fa-link"></i> https://doi.org/${item.doi}
                </a>`;
                metaContent += ` <a href="https://doi.org/${item.doi}" target="_blank" class="doi-link">https://doi.org/${item.doi}</a>`;
            } else if (item.url) {
                linkContent = `<a href="${item.url}" target="_blank" class="paper-link">
                    <i class="fas fa-link"></i> ${item.url}
                </a>`;
                metaContent += ` <a href="${item.url}" target="_blank" class="doi-link">${item.url}</a>`;
            }
            
            div.innerHTML = `
                <div class="paper-title">${title}</div>
                <div class="paper-authors">${authors}</div>
                <div class="paper-journal">${journal}</div>
                <div class="paper-meta">${metaContent}</div>
                <div class="contrib-details">${contrib}</div>
            `;
            
            container.appendChild(div);
        });
        
        // 更新统计数字
        document.getElementById('journalPapersCount').textContent = publicationsData.length;
        
        // 计算中科院一区论文数量
        const casQ1Papers = publicationsData.filter(pub => 
            pub.contrib.zh.includes("中科院一区") || pub.contrib.en.includes("CAS Q1")
        ).length;
        
        document.getElementById('casQ1PapersCount').textContent = casQ1Papers;
        
        // 更新按钮状态
        updateButtonVisibility();
        
        // 更新图表
        updateChart();
    }

    // 更新统计图表
    function updateChart() {
        // 检查Chart.js是否已加载
        if (typeof Chart !== 'undefined') {
            const ctx = document.getElementById('statsChart');
            if (ctx) {
                // 销毁现有图表实例
                if (statsChart) {
                    statsChart.destroy();
                }
                
                // 计算统计数据
                const totalPapers = publicationsData.length;
                const casQ1Papers = publicationsData.filter(pub => 
                    pub.contrib.zh.includes("中科院一区") || pub.contrib.en.includes("CAS Q1")
                ).length;
                const otherPapers = totalPapers - casQ1Papers;
                
                // 分别统计R包和Python库
                const rPackages = softwareData.filter(pkg => pkg.type === 'R package').length;
                const pythonLibraries = softwareData.filter(pkg => pkg.type === 'Python library').length;
                
                // 准备饼图数据 - 总数是所有成果的总和
                const labels = [];
                const data = [];
                const backgroundColor = [];
                
                if (casQ1Papers > 0) {
                    labels.push(currentLang === 'zh' ? `中科院一区 (${casQ1Papers})` : `CAS Q1 (${casQ1Papers})`);
                    data.push(casQ1Papers);
                    backgroundColor.push('#e74c3c');  // 红色
                }
                
                if (otherPapers > 0) {
                    labels.push(currentLang === 'zh' ? `其他期刊 (${otherPapers})` : `Other Journal (${otherPapers})`);
                    data.push(otherPapers);
                    backgroundColor.push('#3498db');  // 蓝色
                }
                
                if (rPackages > 0) {
                    labels.push(currentLang === 'zh' ? `R 软件包 (${rPackages})` : `R Packages (${rPackages})`);
                    data.push(rPackages);
                    backgroundColor.push('#2ecc71');  // 绿色
                }
                
                if (pythonLibraries > 0) {
                    labels.push(currentLang === 'zh' ? `Python 库 (${pythonLibraries})` : `Python Libraries (${pythonLibraries})`);
                    data.push(pythonLibraries);
                    backgroundColor.push('#f39c12');  // 橙色
                }
                
                statsChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: currentLang === 'zh' ? '研究成果分布' : 'Research Distribution',
                            data: data,
                            backgroundColor: backgroundColor,
                            borderColor: 'white',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,  // 关键：禁用宽高比维持
                        plugins: {
                            title: {
                                display: true,
                                text: currentLang === 'zh' ? `研究成果分布 (总计: ${data.reduce((a, b) => a + b, 0)}项)` : `Research Distribution (Total: ${data.reduce((a, b) => a + b, 0)} items)`
                            },
                            legend: {
                                position: 'bottom',
                                labels: {
                                    padding: 20,
                                    usePointStyle: true,
                                    // 在图例中显示百分比
                                    generateLabels: function(chart) {
                                        const data = chart.data;
                                        if (data.labels.length && data.datasets.length) {
                                            return data.labels.map(function(label, i) {
                                                const ds = data.datasets[0];
                                                const total = ds.data.reduce((a, b) => a + b, 0);
                                                const value = ds.data[i] || 0;
                                                const percentage = Math.round((value / total) * 100);
                                                return {
                                                    text: label + ' (' + percentage + '%)',
                                                    fillStyle: ds.backgroundColor[i],
                                                    hidden: isNaN(ds.data[i]) || ds.data[i] === 0,
                                                    lineWidth: 0,
                                                    strokeStyle: 'transparent'
                                                };
                                            });
                                        }
                                        return [];
                                    }
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const label = context.label || '';
                                        const value = context.parsed || 0;
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = ((value / total) * 100).toFixed(1);
                                        return `${label}: ${value} (${percentage}%)`;
                                    }
                                }
                            }
                        },
                        cutout: '40%', // 创建环形图效果，更美观
                        animation: {
                            animateRotate: true,
                            animateScale: false
                        }
                    }
                });
            }
        } else {
            // 如果Chart.js未加载，隐藏图表元素
            const chartElement = document.getElementById('statsChart');
            if (chartElement) {
                chartElement.style.display = 'none';
            }
        }
    }

    // 展示全部出版物
    document.getElementById('viewAllBtn').addEventListener('click', function() {
        document.querySelectorAll('.paper-item').forEach(item => {
            item.classList.add('visible');
        });
        updateButtonVisibility();
    });

    // 收起部分出版物
    document.getElementById('showLessBtn').addEventListener('click', function() {
        document.querySelectorAll('.paper-item').forEach((item, index) => {
            if (index < 3) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
            }
        });
        updateButtonVisibility();
    });
    
    // 更新按钮可见性
    function updateButtonVisibility() {
        const visibleItems = document.querySelectorAll('.paper-item.visible').length;
        const totalItems = publicationsData.length;
        
        if (visibleItems >= totalItems) {
            // 显示收起按钮
            document.getElementById('viewAllBtn').classList.add('hidden');
            document.getElementById('showLessBtn').classList.remove('hidden');
        } else {
            // 显示查看全部按钮
            document.getElementById('viewAllBtn').classList.remove('hidden');
            document.getElementById('showLessBtn').classList.add('hidden');
        }
    }
    
    // 展示全部软件
    document.getElementById('viewAllSoftwareBtn').addEventListener('click', function() {
        document.querySelectorAll('.software-item').forEach(item => {
            item.classList.add('visible');
        });
        updateSoftwareButtonVisibility();
    });

    // 收起部分软件
    document.getElementById('showLessSoftwareBtn').addEventListener('click', function() {
        document.querySelectorAll('.software-item').forEach((item, index) => {
            if (index < 2) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
            }
        });
        updateSoftwareButtonVisibility();
    });
    
    // 更新软件按钮可见性
    function updateSoftwareButtonVisibility() {
        const visibleItems = document.querySelectorAll('.software-item.visible').length;
        const totalItems = softwareData.length;
        
        if (visibleItems >= totalItems) {
            // 显示收起按钮
            document.getElementById('viewAllSoftwareBtn').classList.add('hidden');
            document.getElementById('showLessSoftwareBtn').classList.remove('hidden');
        } else {
            // 显示查看全部按钮
            document.getElementById('viewAllSoftwareBtn').classList.remove('hidden');
            document.getElementById('showLessSoftwareBtn').classList.add('hidden');
        }
    }

    // 搜索功能
    document.getElementById('publicationSearch').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll('.paper-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });

    document.getElementById('softwareSearch').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll('.software-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // 年份过滤功能
    document.getElementById('yearFilter').addEventListener('change', function() {
        const year = this.value;
        document.querySelectorAll('.paper-item').forEach(item => {
            const yearText = item.querySelector('.paper-meta').textContent;
            if (!year || yearText.includes(year)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // 浮动联系按钮功能
    const contactFloat = document.getElementById('contactFloat');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.querySelector('.close-modal');

    contactFloat.addEventListener('click', function() {
        contactModal.classList.add('active');
    });

    closeModal.addEventListener('click', function() {
        contactModal.classList.remove('active');
    });

    // 点击模态框外部关闭
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
        }
    });

    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // 软件卡片悬停效果增强
    const softwareCards = document.querySelectorAll('.software-card, .software-item');
    softwareCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 项目卡片悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // 初始渲染
    renderSoftware();
    renderPublications();
});
