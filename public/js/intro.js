var introArr = [{ src: "./images/logo.png", header: 'd', info: 'd' }, { src: "./images/logo.png", header: 'd', info: 'd' }, { src: "./images/logo.png", header: 'd', info: 'd' }, { src: "./images/logo.png", header: 'd', info: 'd' }]

var currentIndex = 0


$("#next").on("click", () => {
    nextPage()
})

$("#prev").on("click", () => {
    prevPage()
})


function nextPage() {
    if (currentIndex === introArr.length - 1) {
        location.assign("/login")
    }

    else {
        $("#fader").fadeOut(1000, () => {
            
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

function prevPage() {
    if (currentIndex === 1) {
        $("#prev").fadeOut(1000)
    }
    if (currentIndex !== 0) {
        $('#fader').fadeOut(1000, () => {
        currentIndex--
        htmlContent = introArr[currentIndex]
        
        if (currentIndex === introArr.length - 2) {
            $("#next").html("<i>class='material-icons right'>keyboard_arrow_right</i>NEXT")
        }
        $("#img").attr('src', htmlContent.src)
        $("#header").text(htmlContent.header)
        $("#info").text(htmlContent.info)
        $("#fader").fadeIn(1000)
    })
    }
}



