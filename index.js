const progress = document.querySelector('.progress');
const progressLabel = document.querySelector('.progressLabel');
const startBtn = document.querySelector('.startBtn');

const throttle = (func, limit) => {
    let lastFunc
    let lastRan
    return function() {
        const context = this
        const args = arguments
        if (!lastRan) {
            func.apply(context, args)
            lastRan = Date.now()
        } else {
            clearTimeout(lastFunc)
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args)
                    lastRan = Date.now()
                }
            }, limit - (Date.now() - lastRan))
        }
    }
}

const handleProgress = () => {
    let value = 0;
    let interval;
    interval = setInterval(() => {
        if(value === 90) {
            clearInterval(interval);
        }
        value += 10;
        progress.style.width = `${value}%`;
        progressLabel.innerText = `${value}%`;
    }, 1000);
}

const myFunc = throttle(handleProgress, 10000);

startBtn.addEventListener('click', myFunc);
