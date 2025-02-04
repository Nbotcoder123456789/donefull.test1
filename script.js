document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav ul li a");
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const page = this.getAttribute("href");
            loadPage(page);
        });
    });

    function loadPage(page) {
        document.querySelector('main').classList.add('fade-out');
        setTimeout(() => {
            fetch(page)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text();
                })
                .then(data => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    const newContent = doc.querySelector('main').innerHTML;
                    document.querySelector('main').innerHTML = newContent;
                    document.querySelector('main').classList.remove('fade-out');
                    document.querySelector('main').classList.add('fade-in');
                    // Reinitialize the charts after loading new content
                    initializeCharts();
                    // Add footer content
                    addFooterContent();
                })
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error);
                });
        }, 300);
    }

    function initializeCharts() {
        // Initialize Drought Chart
        if (document.getElementById('droughtChart')) {
            fetch('data/drought.json')
                .then(response => response.json())
                .then(data => {
                    const ctx = document.getElementById('droughtChart').getContext('2d');
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: data.years,
                            datasets: [{
                                label: 'Số Vụ Hạn Hán',
                                data: data.droughtCounts,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Số Vụ Hạn Hán'
                                    }
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Năm'
                                    }
                                }
                            }
                        }
                    });
                })
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error);
                });
        }

        // Initialize Sea Level Chart
        if (document.getElementById('seaLevelChart')) {
            fetch('data/sea_level.json')
                .then(response => response.json())
                .then(data => {
                    const ctx = document.getElementById('seaLevelChart').getContext('2d');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data.years,
                            datasets: [{
                                label: 'Mực Nước Biển (cm)',
                                data: data.seaLevels,
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 2,
                                fill: false
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Mực Nước (cm)'
                                    }
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Năm'
                                    }
                                }
                            }
                        }
                    });
                })
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error);
                });
        }

        // Initialize Storms Chart
        if (document.getElementById('stormsChart')) {
            fetch('data/storms.json')
                .then(response => response.json())
                .then(data => {
                    const ctx = document.getElementById('stormsChart').getContext('2d');
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: data.years,
                            datasets: [{
                                label: 'Số Cơn Bão',
                                data: data.stormCounts,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Số Cơn Bão'
                                    }
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Năm'
                                    }
                                }
                            }
                        }
                    });
                })
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error);
                });
        }

        // Initialize Temperature Chart
        if (document.getElementById('temperatureChart')) {
            fetch('data/temperature.json')
                .then(response => response.json())
                .then(data => {
                    const ctx = document.getElementById('temperatureChart').getContext('2d');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data.years,
                            datasets: [{
                                label: 'Nhiệt Độ Trung Bình (°C)',
                                data: data.temperatures,
                                borderColor: 'rgba(255, 206, 86, 1)',
                                borderWidth: 2,
                                fill: false
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: false,
                                    title: {
                                        display: true,
                                        text: 'Nhiệt Độ (°C)'
                                    }
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Năm'
                                    }
                                }
                            }
                        }
                    });
                })
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error);
                });
        }

        // Initialize Landslides Chart
        if (document.getElementById('landslidesChart')) {
            fetch('data/landslides.json')
                .then(response => response.json())
                .then(data => {
                    const ctx = document.getElementById('landslidesChart').getContext('2d');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data.years,
                            datasets: [{
                                label: 'Số Vụ Sạt Lở',
                                data: data.landslideCounts,
                                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                borderColor: 'rgba(153, 102, 255, 1)',
                                borderWidth: 2,
                                fill: false
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Số Vụ Sạt Lở'
                                    }
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Năm'
                                    }
                                }
                            }
                        }
                    });
                })
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error);
                });
        }
    }

    // Add footer content
    function addFooterContent() {
        const footer = document.getElementById('footer');
        footer.innerHTML = `
            <p>&copy; 2025 Biến Đổi Khí Hậu Việt Nam &copy; Cục thủy văn Việt Nam</p>
            <p>Tác giả: Trần Đức Nam</p>
            <p>Người viết: Trần Đức Nam</p>
        `;
    }

    // Initialize charts on page load
    initializeCharts();
    // Add footer content on page load
    addFooterContent();
});
