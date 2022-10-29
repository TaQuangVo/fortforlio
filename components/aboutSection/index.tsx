import { useEffect, useRef } from 'react';
import styles from './styles.module.css'
import gsap from 'gsap'


const  aboutPage = () => {
    const webdev_text_ref = useRef(null)
    const skills_text_ref = useRef(null)
    const name_text_ref = useRef(null)
    const head_text_ref = useRef(null)
    const backgound_text_ref = useRef(null)
    const offer_text_ref = useRef(null)

    useEffect(() => {
        let tl = gsap.timeline({
            delay:10
        })
        .to(webdev_text_ref.current,{
            duration:20,
            xPercent:-100,
        })
        .to(skills_text_ref.current, {
            duration:20,
            xPercent:-165,
        }, 0)
        .to(name_text_ref.current,{
            duration:20,
            xPercent:-800,
        }, 0)
        .to(head_text_ref.current,{
            duration: 1,
            opacity:0
        },3)
        .to(backgound_text_ref.current,{
            opacity:0,
            duration:1,
        },10)
        .to(offer_text_ref.current,{
            opacity:100,
            duration:1,
        },10.5)



        return () => {
            tl.kill();
        }
    },[])


    return (
        <section className={[styles.container, "about"].join(" ")}>
            <span id="section_in_animation" className={styles.section_in_animation}></span>
            <div className={styles.body}>
                <div className={styles.back_text}>
                    <span ref={webdev_text_ref} className={styles.big_text}>
                        <h2 id="webdev-text">WEB-DEVELOPPER</h2>
                        <h4>Contact me.</h4>
                    </span>
                    <pre ref={skills_text_ref} className={styles.skills}>UI/UX Design    -    Front-end    -    Back-end     -    Integration    -    System design</pre>
                    <p ref={name_text_ref} className={styles.name}>//Ta Quang</p>
                </div>
                <div className={styles.content}>
                    <div ref={head_text_ref} className={styles.head}>
                        <span/>
                        <p >
                            I'm an all-in-one<br/>
                            solution for your<br/>
                            online presentation.
                        </p>
                    </div>
                    <div className={styles.desc}>
                        <img src='KTHLogo.jpg' />
                        <div className={styles.desc_body}>
                            <p ref={backgound_text_ref} className={styles.background_text}>
                                <span className={styles.firstLine}>
                                    <span className={styles.desc_head}>My background</span>
                                    <span className={styles.dash} />
                                    <span>I started as</span>
                                </span>
                                <span>a self-taught webdeveloper,<br/></span>
                                <span>currenly studying computer<br/></span>
                                <span>science at KTH.</span>
                            </p>
                            <p ref={offer_text_ref} className={styles.offer_text}>
                                <span className={styles.firstLine}>
                                    <span className={styles.desc_head}>My offer</span>
                                    <span className={styles.dash} />
                                    <span>I love to bring</span>
                                </span>
                                <span>values to the world in my free<br/></span>
                                <span>time. I do both collaboration<br/></span>
                                <span>and stand-alone work.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default aboutPage;