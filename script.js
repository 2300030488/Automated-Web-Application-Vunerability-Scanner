/* =====================================================
   AUTOMATED WEB APPLICATION VULNERABILITY SCANNER
   FRONTEND JAVASCRIPT
===================================================== */


/* ================= AUTHENTICATION ================= */

function showRegister() {

    document.getElementById("loginForm")
        .classList.add("hidden");

    document.getElementById("registerForm")
        .classList.remove("hidden");
}


function showLogin() {

    document.getElementById("registerForm")
        .classList.add("hidden");

    document.getElementById("loginForm")
        .classList.remove("hidden");
}


/* ================= REGISTER ================= */

function register() {

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (!name || !email || !password || !confirmPassword) {

        alert("Please fill all fields.");

        return;
    }


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    const user = {

        name: name,
        email: email,
        password: password

    };


    localStorage.setItem(
        "scannerUser",
        JSON.stringify(user)
    );


    alert("Account created successfully!");

    showLogin();
}


/* ================= LOGIN ================= */

function login() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    const savedUser =
        JSON.parse(localStorage.getItem("scannerUser"));


    if (!savedUser) {

        alert("No account found. Please register first.");

        return;
    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );


        document.getElementById("authPage")
            .classList.add("hidden");

        document.getElementById("appPage")
            .classList.remove("hidden");


        document.getElementById("usernameDisplay")
            .textContent = savedUser.name;


        showPage("dashboard");

    } else {

        alert("Invalid email or password.");

    }
}


/* ================= LOGOUT ================= */

function logout() {

    localStorage.removeItem("loggedIn");

    document.getElementById("appPage")
        .classList.add("hidden");

    document.getElementById("authPage")
        .classList.remove("hidden");

    showLogin();
}


/* ================= PAGE NAVIGATION ================= */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function(page) {

        page.classList.add("hidden");

    });


    const selectedPage =
        document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.classList.remove("hidden");

    }

}


/* ================= QUICK SCAN ================= */

function startQuickScan() {

    const target =
        document.getElementById("dashboardTarget")
            .value.trim();


    if (!target) {

        alert("Please enter a target URL.");

        return;
    }


    document.getElementById("targetUrl")
        .value = target;


    startScan();
}


/* ================= START SCAN ================= */

function startScan() {

    const target =
        document.getElementById("targetUrl")
            .value.trim();


    if (!target) {

        alert("Please enter a target URL.");

        return;
    }


    /* Collect selected checks */

    const checkboxes =
        document.querySelectorAll(
            '.check-option input[type="checkbox"]:checked'
        );


    const checks =
        Array.from(checkboxes)
            .map(function(checkbox) {

                return checkbox.value;

            });


    const scanDepth =
        parseInt(
            document.getElementById("scanDepth").value
        );


    /* Backend request object */

    const scanRequest = {

        targetUrl: target,

        scanDepth: scanDepth,

        checks: checks

    };


    console.log(
        "Scan Request:",
        scanRequest
    );


    /*
        Example request:

        {
            targetUrl: "http://localhost:3000",
            scanDepth: 5,
            checks: [
                "SQL_INJECTION",
                "XSS",
                "CSRF",
                "SECURITY_HEADERS"
            ]
        }
    */


    document.getElementById("scanningTarget")
        .textContent =
        "Target: " + target;


    document.getElementById("resultTarget")
        .textContent =
        target;


    showPage("scanProgress");


    runScanSimulation();

}


/* ================= SCAN SIMULATION ================= */

function runScanSimulation() {

    let progress = 0;

    const steps = [

        "Target Validation",

        "Web Crawling",

        "Endpoint Discovery",

        "Parameter Analysis",

        "SQL Injection",

        "XSS Detection",

        "Risk Analysis",

        "Report Generation"

    ];


    let currentStep = 0;


    const interval =
        setInterval(function() {


            if (currentStep > 0) {

                const previousStep =
                    document.getElementById(
                        "step" + currentStep
                    );


                previousStep.classList.remove("active");

                previousStep.classList.add("done");

                previousStep.querySelector("b")
                    .textContent = "✓ Completed";
            }


            currentStep++;


            if (currentStep <= steps.length) {

                const current =
                    document.getElementById(
                        "step" + currentStep
                    );


                current.classList.add("active");

                current.querySelector("b")
                    .textContent = "Scanning...";


                document.getElementById("scanMessage")
                    .textContent =
                    steps[currentStep - 1] +
                    " in progress...";


                progress =
                    Math.round(
                        (currentStep / steps.length) * 100
                    );


                document.getElementById(
                    "progressFill"
                ).style.width =
                    progress + "%";


                document.getElementById(
                    "progressPercent"
                ).textContent =
                    progress + "%";

            }


            if (currentStep >= steps.length) {

                clearInterval(interval);


                document.getElementById("scanMessage")
                    .textContent =
                    "Scan completed successfully!";


                setTimeout(function() {

                    showPage("results");

                }, 1000);

            }

        }, 1000);

}


/* ================= VULNERABILITY DATA ================= */

const vulnerabilities = {

    sql: {

        title: "SQL INJECTION",

        severity: "CRITICAL",

        cvss: "9.8",

        endpoint: "/login",

        parameter: "username",

        evidence:
            "Suspicious database response detected.",

        impact:
            "Potential unauthorized database access.",

        remediation: [

            "Use parameterized queries",

            "Validate user input",

            "Avoid dynamic SQL queries",

            "Apply proper database permissions"

        ]

    },


    xss: {

        title: "CROSS-SITE SCRIPTING",

        severity: "HIGH",

        cvss: "8.2",

        endpoint: "/search",

        parameter: "query",

        evidence:
            "User-controlled input was reflected without proper encoding.",

        impact:
            "An attacker may execute malicious scripts in a victim's browser.",

        remediation: [

            "Encode user-controlled output",

            "Validate input",

            "Implement Content Security Policy",

            "Use secure output handling"

        ]

    },


    csrf: {

        title: "CROSS-SITE REQUEST FORGERY",

        severity: "MEDIUM",

        cvss: "6.5",

        endpoint: "/profile",

        parameter: "POST request",

        evidence:
            "CSRF protection token was not detected.",

        impact:
            "Unauthorized actions could potentially be performed using a victim's session.",

        remediation: [

            "Use CSRF tokens",

            "Validate request origin",

            "Use SameSite cookies"

        ]

    },


    header: {

        title: "MISSING SECURITY HEADER",

        severity: "LOW",

        cvss: "3.7",

        endpoint: "/api",

        parameter: "HTTP Response",

        evidence:
            "Recommended security header was not present.",

        impact:
            "Missing security headers can reduce browser-side protection.",

        remediation: [

            "Configure security headers",

            "Use Content-Security-Policy",

            "Enable X-Content-Type-Options",

            "Configure Strict-Transport-Security"

        ]

    }

};


/* ================= VULNERABILITY DETAILS ================= */

function showVulnerability(type) {

    const data =
        vulnerabilities[type];


    if (!data) {

        return;

    }


    document.getElementById("detailTitle")
        .textContent =
        data.title;


    document.getElementById("detailSeverity")
        .textContent =
        data.severity;


    document.getElementById("detailSeverity")
        .className =
        "severity " +
        data.severity.toLowerCase();


    document.getElementById("detailCvss")
        .textContent =
        data.cvss;


    document.getElementById("detailEndpoint")
        .textContent =
        data.endpoint;


    document.getElementById("detailParameter")
        .textContent =
        data.parameter;


    document.getElementById("detailEvidence")
        .textContent =
        data.evidence;


    document.getElementById("detailImpact")
        .textContent =
        data.impact;


    const remediation =
        document.getElementById(
            "detailRemediation"
        );


    remediation.innerHTML = "";


    data.remediation.forEach(function(item) {

        const li =
            document.createElement("li");

        li.textContent = item;

        remediation.appendChild(li);

    });


    showPage("vulnerabilityDetails");

}


/* ================= DOWNLOAD REPORT ================= */

function downloadReport() {

    const report = `

AUTOMATED WEB APPLICATION
VULNERABILITY SCANNER

================================

SCAN REPORT

Target:
http://localhost:3000

Date:
21-09-2026

================================

SUMMARY

Total Findings: 12
Critical: 1
High: 3
Medium: 5
Low: 3

================================

VULNERABILITIES

1. SQL Injection
Severity: Critical
CVSS: 9.8
Endpoint: /login

2. Cross-Site Scripting
Severity: High
CVSS: 8.2
Endpoint: /search

3. CSRF
Severity: Medium
CVSS: 6.5
Endpoint: /profile

4. Missing Security Header
Severity: Low
CVSS: 3.7
Endpoint: /api

================================

END OF REPORT

`;


    const blob =
        new Blob(
            [report],
            { type: "text/plain" }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "vulnerability-scan-report.txt";


    link.click();


    URL.revokeObjectURL(url);

}


/* ================= PAGE LOAD ================= */

window.onload = function() {

    const loggedIn =
        localStorage.getItem("loggedIn");


    const savedUser =
        JSON.parse(
            localStorage.getItem("scannerUser")
        );


    if (loggedIn === "true" && savedUser) {

        document.getElementById("authPage")
            .classList.add("hidden");

        document.getElementById("appPage")
            .classList.remove("hidden");

        document.getElementById("usernameDisplay")
            .textContent =
            savedUser.name;

        showPage("dashboard");

    } else {

        document.getElementById("authPage")
            .classList.remove("hidden");

        document.getElementById("appPage")
            .classList.add("hidden");

    }

};