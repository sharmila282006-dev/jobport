function registerUser() {
    alert("registerUser called");

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Please fill all fields");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Password does not match");
        return false;
    }
    localStorage.setItem("name", name);
localStorage.setItem("email", email);
localStorage.setItem("phone", phone);
localStorage.setItem("password", password);

    alert("Registration Successful!");

    window.location.href = "login.html";

    return false;
}

function applyJob(jobName) {

    localStorage.setItem("selectedJob", jobName);

    window.location.href = "apply.html";
}
function searchJobs() {

    let input = document.getElementById("search").value.toLowerCase();

    let jobs = document.getElementsByClassName("job-card");

    for (let i = 0; i < jobs.length; i++) {

        let title = jobs[i].querySelector("h3").textContent.toLowerCase();
        

        if (title.includes(input)) {
            jobs[i].style.display = "block";
        } else {
            jobs[i].style.display = "none";
        }
    }
}
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location.href = "login.html";
}
function checkLogin() {
    let user = localStorage.getItem("loggedInUser");

    if (user == null) {
        alert("Please login first!");
        window.location.href = "login.html";
    }
}
function showUser() {
    let user = localStorage.getItem("loggedInUser");

    if (user) {
        document.getElementById("welcomeUser").innerHTML = "Welcome, " + user;
    }
}

function showAppliedJob() {

    let job = localStorage.getItem("selectedJob");
    let name = localStorage.getItem("applicationName");
    let email = localStorage.getItem("applicationEmail");
    let phone = localStorage.getItem("applicationPhone");
    let applicationDate = localStorage.getItem("applicationDate");

    document.getElementById("applicationDate").innerText =
        applicationDate || "Not available";

    document.getElementById("appliedJob").innerText =
        job ? "💼 You applied for: " + job : "No application found.";

    let savedStatus = localStorage.getItem("applicationStatus");

    if (savedStatus) {
        document.getElementById("applicationStatus").value = savedStatus;
    }

    document.getElementById("applicationName").innerText =
        name || "Not available";

    document.getElementById("applicationEmail").innerText =
        email || "Not available";

    document.getElementById("applicationPhone").innerText =
        phone || "Not available";

    let message = document.getElementById("statusMessage");

    if (message) {

        if (savedStatus === "Shortlisted") {
            message.innerText =
                "🟢 Congratulations! You have been shortlisted for the next round.";
        }
        else if (savedStatus === "Rejected") {
            message.innerText =
                "🔴 Your application was not selected for this position.";
        }
        else {
            message.innerText =
                "🟡 Your application is currently being reviewed by the company.";
        }
    }
}

function showProfile() {

    let name = localStorage.getItem("name");
    let email = localStorage.getItem("email");
    let phone = localStorage.getItem("phone");

    // If Resume data is available, use it
    let savedResume = localStorage.getItem("resumeData");

    if (savedResume) {
        let resume = JSON.parse(savedResume);

        name = resume.name || name;
        email = resume.email || email;
        phone = resume.phone || phone;
    }

    document.getElementById("profileName").innerText =
        name || "Job Seeker";

    document.getElementById("profileEmail").innerText =
        email || "Email not available";

    document.getElementById("emailDetails").innerText =
        email || "Not available";

    document.getElementById("phoneDetails").innerText =
        phone || "Not available";
}

function saveResume() {

    const resume = {
        name: document.getElementById("resumeName").value,
        email: document.getElementById("resumeEmail").value,
        phone: document.getElementById("resumePhone").value,
        degree: document.getElementById("resumeDegree").value,
        college: document.getElementById("resumeCollege").value,
        year: document.getElementById("resumeYear").value,
        skills: document.getElementById("resumeSkills").value,
        experience: document.getElementById("resumeExperience").value,
        objective: document.getElementById("resumeObjective").value
    };

    localStorage.setItem("resumeData", JSON.stringify(resume));

    alert("Resume saved successfully!");
}

function loadResume() {

    let savedResume = localStorage.getItem("resumeData");

    if (!savedResume) {
        return;
    }

    let resume = JSON.parse(savedResume);

    document.getElementById("resumeName").value = resume.name || "";
    document.getElementById("resumeEmail").value = resume.email || "";
    document.getElementById("resumePhone").value = resume.phone || "";

    document.getElementById("resumeDegree").value = resume.degree || "";
    document.getElementById("resumeCollege").value = resume.college || "";
    document.getElementById("resumeYear").value = resume.year || "";

    document.getElementById("resumeSkills").value = resume.skills || "";
    document.getElementById("resumeExperience").value = resume.experience || "";
    document.getElementById("resumeObjective").value = resume.objective || "";
}
function showNotification() {

    let notification = localStorage.getItem("notification");
    let notificationBox = document.getElementById("savedNotification");

    if (notificationBox) {
        if (notification) {
            notificationBox.innerHTML = "🔔 " + notification;
        } else {
            notificationBox.innerHTML = "";
        }
    }
}// Save a job
function saveJob(jobName) {

    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (!savedJobs.includes(jobName)) {
        savedJobs.push(jobName);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

        alert(jobName + " saved successfully ⭐");
    } else {
        alert("This job is already saved!");
    }
}
function showSavedJobs() {

    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    let savedJobsList = document.getElementById("savedJobsList");

    let savedJobCount = document.getElementById("savedJobCount");

if (savedJobCount) {
    savedJobCount.innerText =
        "⭐ You have saved " + savedJobs.length + " job(s)";
}

    if (!savedJobsList) {
        return;
    }

    if (savedJobs.length === 0) {
        savedJobsList.innerHTML = "<p>No saved jobs yet.</p>";
        return;
    }

    savedJobsList.innerHTML = "";

    savedJobs.forEach(function(job) {

        savedJobsList.innerHTML += `
            <div class="notification-card">
                <h3>⭐ ${job}</h3>
                <p>You saved this job for later.</p>

                <button onclick="applySavedJob('${job}')">
                    📝 Apply Now
                </button>

                <button onclick="unsaveJob('${job}')">
                    ❌ Unsave
                </button>
            </div>
        `;
    });
}


// Apply from Saved Jobs
function applySavedJob(jobName) {

    localStorage.setItem("selectedJob", jobName);

    window.location.href = "apply.html";
}
function unsaveJob(jobName) {

    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    savedJobs = savedJobs.filter(function(job) {
        return job !== jobName;
    });

    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

    alert(jobName + " removed from Saved Jobs ❌");

    showSavedJobs();
}

function searchAndFilterJobs() {

    let searchText = document.getElementById("search").value.toLowerCase();
    let location = document.getElementById("locationFilter").value.toLowerCase();
    let experience = document.getElementById("experienceFilter").value.toLowerCase();

    let jobCards = document.querySelectorAll(".job-card");
    let noJobsMessage = document.getElementById("noJobsMessage");

    jobCards.forEach(function(card) {

        let jobText = card.innerText.toLowerCase();

        let searchMatch = searchText === "" || jobText.includes(searchText);
        let locationMatch = location === "" || jobText.includes(location);
        let experienceMatch = experience === "" || jobText.includes(experience);

        if (searchMatch && locationMatch && experienceMatch) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
let visibleJobs = 0;

jobCards.forEach(function(card) {
    if (card.style.display !== "none") {
        visibleJobs++;
    }
});

if (noJobsMessage) {
    if (visibleJobs === 0) {
        noJobsMessage.style.display = "block";
    } else {
        noJobsMessage.style.display = "none";
    }
}
    });
}

function viewJob(jobName) {

    let company = "";
    let location = "";
    let salary = "";
    let experience = "";

    if (jobName === "Software Developer") {
        company = "TCS";
        location = "Chennai";
        salary = "₹4.5 LPA";
        experience = "Fresher / 0-2 Years";
    }

    else if (jobName === "Frontend Developer") {
        company = "Infosys";
        location = "Bangalore";
        salary = "₹5 LPA";
        experience = "1-3 Years";
    }

    else if (jobName === "Java Developer") {
        company = "Wipro";
        location = "Hyderabad";
        salary = "₹6 LPA";
        experience = "2+ Years";
    }

    else if (jobName === "Python Developer") {
        company = "Zoho";
        location = "Chennai";
        salary = "₹7 LPA";
        experience = "Fresher / 0-2 Years";
    }

    else if (jobName === "UI/UX Designer") {
        company = "Accenture";
        location = "Bangalore";
        salary = "₹6 LPA";
        experience = "1-2 Years";
    }

    else if (jobName === "Data Analyst") {
        company = "Cognizant";
        location = "Hyderabad";
        salary = "₹6.5 LPA";
        experience = "Fresher / 1 Year";
    }

    document.getElementById("modalJobName").innerText = jobName;
    document.getElementById("modalCompany").innerText = "🏢 Company: " + company;
    document.getElementById("modalLocation").innerText = "📍 Location: " + location;
    document.getElementById("modalSalary").innerText = "💰 Salary: " + salary;
    document.getElementById("modalExperience").innerText = "💼 Experience: " + experience;

    document.getElementById("jobModal").style.display = "block";
}

function closeJobModal() {
    document.getElementById("jobModal").style.display = "none";
}

function withdrawApplication() {

    let confirmWithdraw = confirm(
        "Are you sure you want to withdraw your application?"
    );

    if (!confirmWithdraw) {
        return;
    }

    localStorage.removeItem("selectedJob");
    localStorage.removeItem("applicationName");
    localStorage.removeItem("applicationEmail");
    localStorage.removeItem("applicationPhone");

    alert("Application withdrawn successfully!");

    window.location.reload();
}


function updateApplicationStatus() {

    let status = document.getElementById("applicationStatus").value;

    localStorage.setItem("applicationStatus", status);

    let message = document.getElementById("statusMessage");

    if (message) {

        if (status === "Under Review") {
            message.innerText =
                "🟡 Your application is currently being reviewed by the company.";
        }
        else if (status === "Shortlisted") {
            message.innerText =
                "🟢 Congratulations! You have been shortlisted for the next round.";
        }
        else if (status === "Rejected") {
            message.innerText =
                "🔴 Your application was not selected for this position.";
        }
    }

    alert("Application status updated successfully!");
}

function showAdminDashboard() {

    // Total Jobs
    fetch("get_job_count.php")
        .then(response => response.text())
        .then(count => {
            let jobsBox = document.getElementById("totalJobs");

            if (jobsBox) {
                jobsBox.innerText = count.trim();
            }
        })
        .catch(error => {
            console.log("Job count error:", error);
        });


    // Total Applications
    fetch("get_application_count.php")
        .then(response => response.text())
        .then(count => {
            let applicationsBox =
                document.getElementById("totalApplications");

            if (applicationsBox) {
                applicationsBox.innerText = count.trim();
            }
        })
        .catch(error => {
            console.log("Application count error:", error);
        });


    // Saved Jobs
    let savedJobs =
        JSON.parse(localStorage.getItem("savedJobs")) || [];

    let savedBox =
        document.getElementById("totalSavedJobs");

    if (savedBox) {
        savedBox.innerText = savedJobs.length;
    }


    // Notifications
    let notification =
        localStorage.getItem("notification");

    let notificationBox =
        document.getElementById("notificationStatus");

    if (notificationBox) {
        notificationBox.innerText =
            notification ? "1" : "0";
    }


    // Job Alerts
    let jobAlerts =
        localStorage.getItem("jobAlerts");

    let jobAlertBox =
        document.getElementById("jobAlertStatus");

    if (jobAlertBox) {
        jobAlertBox.innerText =
            jobAlerts === "enabled" ? "1" : "0";
    }


    // Recent Application
    fetch("get_admin_application.php")
        .then(response => response.json())
        .then(application => {

            let adminApplication =
                document.getElementById("adminApplication");

            if (!adminApplication) {
                return;
            }

            if (application.length === 0) {
                adminApplication.innerHTML =
                    "No applications available.";
                return;
            }

            let statusIcon = "🟡";

            if (application.status === "Shortlisted") {
                statusIcon = "🟢";
            } 
            else if (application.status === "Rejected") {
                statusIcon = "🔴";
            }

            adminApplication.innerHTML =
                "💼 <b>Job:</b> " + application.title +
                "<br>🏢 <b>Company:</b> " + application.company +
                "<br>👤 <b>Name:</b> " + application.name +
                "<br>📧 <b>Email:</b> " + application.email +
                "<br>📱 <b>Phone:</b> " + application.phone +
                "<br>" + statusIcon +
                " <b>Status:</b> " + application.status;
        })
        .catch(error => {
            console.log("Application error:", error);
        });
}

function viewAdminApplication() {

    fetch("get_admin_application.php")
        .then(response => response.json())
        .then(application => {

            if (application.length === 0) {
                alert("No application available.");
                return;
            }

            alert(
                "📋 FULL APPLICATION DETAILS\n\n" +
                "💼 Job: " + application.title + "\n" +
                "🏢 Company: " + application.company + "\n" +
                "📍 Location: " + application.location + "\n" +
                "👤 Name: " + application.name + "\n" +
                "📧 Email: " + application.email + "\n" +
                "📱 Phone: " + application.phone + "\n" +
                "📄 Resume: " + (application.resume || "Not uploaded") + "\n" +
                "📌 Status: " + application.status
            );

        })
        .catch(error => {
            console.log("Application error:", error);
            alert("Unable to load application.");
        });
}

function showAddJobForm() {

    let form = document.getElementById("addJobForm");

    form.innerHTML = `
        <div class="add-job-form">

            <h3>➕ Add New Job</h3>

            <input type="text" id="newJobName" placeholder="Job Title">

            <input type="text" id="newCompany" placeholder="Company">

            <input type="text" id="newLocation" placeholder="Location">

            <input type="text" id="newSalary" placeholder="Salary">

            <input type="text" id="newExperience" placeholder="Experience">

            <br><br>

            <button onclick="addNewJob()">
                ✅ Add Job
            </button>

        </div>
    `;
}
function addNewJob() {

    let jobName = document.getElementById("newJobName").value;
    let company = document.getElementById("newCompany").value;
    let location = document.getElementById("newLocation").value;
    let salary = document.getElementById("newSalary").value;
    let experience = document.getElementById("newExperience").value;

    if (
        jobName === "" ||
        company === "" ||
        location === "" ||
        salary === "" ||
        experience === ""
    ) {
        alert("Please fill all job details!");
        return;
    }

    fetch("add_job.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body:
            "title=" + encodeURIComponent(jobName) +
            "&company=" + encodeURIComponent(company) +
            "&location=" + encodeURIComponent(location) +
            "&salary=" + encodeURIComponent(salary) +
            "&experience=" + encodeURIComponent(experience)
    })
    .then(response => response.text())
    .then(result => {

        alert(result);

        if (result.includes("successfully")) {
            document.getElementById("addJobForm").innerHTML = "";
            showAdminJobs();
        }

    })
    .catch(error => {
        console.log("Add Job Error:", error);
        alert("Unable to add job.");
    });
}

function showAdminJobs() {

    fetch("get_jobs.php")
        .then(response => response.json())
        .then(jobs => {

            let jobList = document.getElementById("adminJobList");

            if (!jobList) {
                return;
            }

            if (jobs.length === 0) {
                jobList.innerHTML = "<p>No jobs available.</p>";
                return;
            }

            jobList.innerHTML = "<h3>📋 Added Jobs</h3>";

            jobs.forEach(function(job) {

                jobList.innerHTML += `
                    <div class="admin-job-card">

                        <h3>💼 ${job.title}</h3>

                        <p>🏢 <b>Company:</b> ${job.company}</p>

                        <p>📍 <b>Location:</b> ${job.location}</p>

                        <p>💰 <b>Salary:</b> ${job.salary}</p>

                        <p>💼 <b>Experience:</b> ${job.experience}</p>

<button onclick="deleteJobFromDatabase(${job.id})">
    🗑️ Delete
</button>

                    </div>
                `;
            });

        })
        .catch(error => {
            console.log("Admin Jobs Error:", error);
        });
}

function deleteJobFromDatabase(jobId) {

    if (!confirm("Are you sure you want to delete this job?")) {
        return;
    }

    fetch("delete_job.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "job_id=" + encodeURIComponent(jobId)
    })
    .then(response => response.text())
    .then(result => {

        alert(result);

        if (result.includes("successfully")) {
            showAdminJobs();
        }

    })
    .catch(error => {
        console.log("Delete Job Error:", error);
        alert("Unable to delete job.");
    });
}

function deleteAdminJob(index) {

    let jobs = JSON.parse(localStorage.getItem("adminJobs")) || [];

    let confirmDelete = confirm(
        "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
        return;
    }

    jobs.splice(index, 1);

    localStorage.setItem("adminJobs", JSON.stringify(jobs));

    alert("Job deleted successfully! 🗑️");

    showAdminJobs();
}

function editAdminJob(index) {

    let jobs = JSON.parse(localStorage.getItem("adminJobs")) || [];
    let job = jobs[index];

    let newName = prompt("Enter Job Title:", job.name);
    let newCompany = prompt("Enter Company:", job.company);
    let newLocation = prompt("Enter Location:", job.location);
    let newSalary = prompt("Enter Salary:", job.salary);
    let newExperience = prompt("Enter Experience:", job.experience);

    if (
        newName === null ||
        newCompany === null ||
        newLocation === null ||
        newSalary === null ||
        newExperience === null
    ) {
        return;
    }

    job.name = newName;
    job.company = newCompany;
    job.location = newLocation;
    job.salary = newSalary;
    job.experience = newExperience;

    jobs[index] = job;

    localStorage.setItem("adminJobs", JSON.stringify(jobs));

    alert("Job updated successfully! ✏️");

    showAdminJobs();
}
function showAdminJobsOnJobsPage() {

    fetch("get_jobs.php")
        .then(response => response.json())
        .then(jobs => {

            let container = document.getElementById("adminJobsContainer");

            if (!container) {
                return;
            }

            container.innerHTML = "";

            jobs.forEach(function(job) {

                container.innerHTML += `
                    <div class="job-card">

                        <h3>💼 ${job.title}</h3>

                        <p><b>Company:</b> ${job.company}</p>

                        <p><b>Location:</b> ${job.location}</p>

                        <p><b>Salary:</b> ${job.salary}</p>

                        <p><b>Experience:</b> ${job.experience}</p>

                        <p style="color:green; font-weight:bold;">
                            🟢 Hiring Now
                        </p>

                        <button onclick="viewJob('${job.title}')">
                            👀 View Details
                        </button>

                        <button onclick="applyJob('${job.title}')">
                            🚀 Apply Now
                        </button>

                        <button onclick="saveJobToDatabase(${job.id})">
                            ⭐ Save Job
                        </button>

                    </div>
                `;
            });

        })
        .catch(error => {
            console.log("Admin Jobs Error:", error);
        });
}

function viewAdminJob(jobName) {

    let jobs = JSON.parse(localStorage.getItem("adminJobs")) || [];

    let job = jobs.find(function(item) {
        return item.name === jobName;
    });

    if (!job) {
        alert("Job details not found!");
        return;
    }

    alert(
        "💼 JOB DETAILS\n\n" +
        "Job: " + job.name + "\n" +
        "🏢 Company: " + job.company + "\n" +
        "📍 Location: " + job.location + "\n" +
        "💰 Salary: " + job.salary + "\n" +
        "💼 Experience: " + job.experience
    );
}
function clearAdminApplication() {

    let confirmClear = confirm(
        "Are you sure you want to clear the application?"
    );

    if (!confirmClear) {
        return;
    }

    fetch("delete_application.php")
        .then(response => response.text())
        .then(result => {

            if (result.includes("successfully")) {

                alert("Application cleared successfully! 🧹");

                showAdminDashboard();

            } else {

                alert(result);

            }

        })
        .catch(error => {

            console.log("Delete error:", error);

            alert("Unable to clear application.");

        });
}

function changeAdminStatus() {

    let newStatus = prompt(
        "Enter Status:\n\nUnder Review\nShortlisted\nRejected",
        "Under Review"
    );

    if (newStatus === null) {
        return;
    }

    if (
        newStatus !== "Under Review" &&
        newStatus !== "Shortlisted" &&
        newStatus !== "Rejected"
    ) {
        alert("Please enter a valid status!");
        return;
    }

    fetch("update_status.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "status=" + encodeURIComponent(newStatus)
    })
    .then(response => response.text())
    .then(result => {

        if (result.includes("successfully")) {
            alert("Application status updated successfully! 📌");
            showAdminDashboard();
        } else {
            alert(result);
        }

    })
    .catch(error => {
        console.log("Status error:", error);
        alert("Unable to update status.");
    });
}

function enableJobAlerts() {

    fetch("job_alert.php")
        .then(response => response.text())
        .then(result => {

            alert(result);

        })
        .catch(error => {

            console.log("Job Alert Error:", error);

            alert("Unable to update Job Alerts.");

        });
}