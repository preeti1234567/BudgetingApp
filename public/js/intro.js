

var introArr = [{ src: "./images/logo.png", header: 'What is FinanChill?', info: 'FinanChill is the app that helps you save without the stress. This introduction will help you learn how to use FinanChill to manage your budget more easily than ever.' },
{ src: "./images/userfinancials1.png", header: 'The Financials Page', info: "The financials page that you will be directed to when you first login contains all of your budgeting information. The first two fields are for INCOME and NECESSARY EXPENSES. This is where you will input the sources of momey coming into your bank account, and all of the expenses that you cannot cut back on when trying to save -- we'll see some examples in a bit." },
{ src: "./images/userfinancials.png", header: 'The Financials Page (cont)', info: "The second two fields are UNNECESSARY EXPENSES and ONE-TIME PURCHASES. Unnecessary expenses are expenses worked into your routine that, if needed, you could cut back on to save. The one-time purchase field is where you can enter single purchases that you are thinking about making, and want to work into your budget. Now, let's see some examples of these fields with someone who just started using FinanChill." }, 
{ src: "./images/dashboard2.png", header: 'The Dashboard', info: 'The dashboard is where your budgeting information is displayed for you. Here, we are looking at an example of someone who just started using FinanChill yesterday. Our user has entered some sources of income, as well as some necessary expenses.' }, 
{ src: "./images/dashboard3.png", header: 'The Dashboard', info: 'The user also has entered some unnecessary expenses. Starbucks coffee, trip to chiptole, and movie theatre tickets are all could be avoided, but the user spends money on these things consistently, and has entered them into the budget.' },
{ src: "./images/dashboard4.png", header: "Singular Purchases", info: "Now, our user has entered some purchases that they would like to make. Based on the current budget information, FinanChill calculates the average savings per day of the user, and reports back how many days are required on the current track to save for these more luxurious expenses!"},
{ src: "./images/dashboard5.png", header: "Budget Visualization", info: "From the day you sign up, FinanChill saves your budget information, and displays it graphically to you as you save over time. Because our user has only had an account for one day, the graph is pretty boring, but over time, it will evolve to become very informative. Let's see what happens if our user decides to click 'MAKE PURCHASE' and buy the new laptop"},
{ src: "./images/dashboard6.png", header: "In the Negative!", info: "The user has not saved enough, and the budget is negative since the start of their FinanChill account! FinanChill will notify the user of how in the negative the current budget is, and will suggest that the user save more deliberately..."},
{ src: "./images/logo.png", header: 'Get Started', info: 'Now, you are ready to start saving with FinanChill!' }
]

var currentIndex = -1


$("#next").on("click", () => {
    nextPage()
})



function nextPage() {
    if (currentIndex === introArr.length - 1) {
        $("#fader").fadeOut(2000, () => {
        location.assign("/login")
        })
    }

    else {
        $("#fader").fadeOut(1000, () => {

            if (currentIndex === introArr.length - 2) {
                $("#img").css("width", "30%")
                $(".container").css("margin-top", "10%")
                $(".container").css("margin-bottom", "0%")
            }
        
            else if (currentIndex === 0) {
                $("#img").css("width", "80%")
                $(".container").css("margin-top", "4%")
                $(".container").css("margin-bottom", "2%")
            }

            currentIndex++
            htmlContent = introArr[currentIndex]
            if (currentIndex === 1) {
                $("#prev").css("visibility", "visible")
            }
            else if (currentIndex === introArr.length - 1) {
                $("#next").text("login")
            }
            $("#img").attr('src', htmlContent.src)
            $("#header").text(htmlContent.header)
            $("#info").text(htmlContent.info)
            $("#fader").fadeIn(1000)
        })

    }
}




