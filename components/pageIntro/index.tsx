import { useEffect, useRef } from 'react'
import styles from './styles.module.css'
import gsap from 'gsap'

const pageIntro = () => {

    const initialLoad = useRef(true)

    useEffect(() => {
        if(!initialLoad.current) 
            return
            
        const title1 : HTMLElement|null = document.querySelector(".intro__title--1")
        if(title1)
        {
            title1.innerHTML = title1.innerText
            .split("")
            .map(letter => {
                return `<span class="letter-splited intro__title1--letter">${letter}</span>`
            })
            .join("")
        }

        
        const title2 : HTMLElement|null = document.querySelector(".intro__title--2")
        if(title2)
        {
            title2.innerHTML = title2.innerText
            .split("")
            .map(letter => {
                if(letter === "a")
                return `
                <svg class="letter-splited intro__title2--long-a" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 244.93 51.68">
                    <defs>
                    <style>
                        .cls-1 {
                        fill: #fff;
                        }
                
                        .cls-2 {
                        fill: #b32126;
                        }
                
                        .cls-3 {
                        fill: #231f20;
                        }
                    </style>
                    </defs>
                    <rect class="cls-3" x="0" y="0" width="244.42" height="51.68" rx="25.84" ry="25.84"/>
                    <rect class="cls-1" x="11.19" y="11.34" width="225.28" height="28.56" rx="14.28" ry="14.28"/>
                    <circle class="cls-2" cx="25.61" cy="25.84" r="11.43"/>
                    <rect class="cls-3" x="236.47" width="8.47" height="51.68"/>
                </svg>`
                return `<span class="letter-splited intro__title2--letter">${letter}</span>`
            })
            .join("")
        }
        let introTimeLine: gsap.core.Timeline
        introTimeLine = gsap.timeline().from(".letter-splited", {
            duration:1, 
            y:40, 
            ease:"power3.out", 
            stagger:0.1, 
            onComplete: () => {
                const pageIntro = document.getElementById("page-intro-container")
                if(pageIntro)
                    pageIntro.classList.add("display-none")
                introTimeLine!.kill()
            }
        },1)

        
        initialLoad.current = false
    }, [])

    return (
        <div id="page-intro-container" className={[styles.container, "page-intro"].join(" ")}>
            <h2 className='intro__title intro__title--1'>Need Web-developers?</h2>
            <h2 className='intro__title intro__title--2'>I'm All You Searching for!</h2>
        </div>
    )
}

export default pageIntro