
//自定义节流
var throttle = (fn, wait, immediate) => {
    let timer;
    let context, args;
    let run = () => {
        setTimeout(() => {
            if (!immediate) {
                fn.apply(context, args);
            }
            clean()
        }, wait)

    }
    let clean = () => {
        clearTimeout(timer);
        timer = null
    }
    return function () {
        context = this;
        args = arguments;
        if (!timer) {
            if (immediate) {
                fn.apply(context, args);
            }
            run()
        }
    }
}

//自定义防抖函数
var debounce_force = (fn, wait) => {
    let timer, startTimeStamp = 0;
    let context, args;
    let run = () => {
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait)
    }
    let clear = () => {
        clearTimeout(timer);
        timer = null;
    }
    return function () {
        context = this;
        args = arguments;
        let now = (new Date()).getTime();
        if ((now - startTimeStamp) < wait) {
            clear()
            run()
        } else {
            run()
        }
        startTimeStamp = now;
    }
}
//优化版
//执行的是一段时间内的
var debounce_opt = (fn, wait) => {
    let timer, startTimeStamp = 0;
    let context, args;
    let run = (waitTime) => {
        timer = setTimeout(() => {
            let now = (new Date()).getTime();
            let interval = now - startTimeStamp;
            if (interval < waitTime) {
                // clearTimeout(timer)
                startTimeStamp = now;
                run(waitTime - interval)
            } else {
                fn.apply(context, args)
                clearTimeout(timer);
                timer = null;
            }
        }, waitTime)
    }
    return function () {
        context = this;
        args = arguments;
        startTimeStamp = (new Date()).getTime();
        if (!timer) {
            run(wait);
        }
    }
}
export default {
    throttle,
    debounce_force,
    debounce_opt
}
