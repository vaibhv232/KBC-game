import React, { useEffect, useState } from 'react'
import useSound from 'use-sound'
import play from "../assets/play.mp3"
import correct from "../assets/correct.mp3"
import wrong from "../assets/wrong.mp3"

import "./trivia.css"
const Trivia = ({
    data,
    setStop,
    questionNumber,
    setQuestionNumber
}) => {
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);
    useEffect(() => {
        letsPlay();
    }, [letsPlay]);

    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");

    



    useEffect(() => {
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber]);

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration)

    }

    const handleClick = (a) => {
        setSelectedAnswer(a);
        setClassName('answer active'); //made the selected option blue 

        delay(3000, () =>
            setClassName(a.correct ? "answer correct" : "answer wrong")
        ); // after 3 second assign the animation as per the click either correct or wrong 
        delay(4000, () => {     // if answer is true after waiting 3 second of the answer reveal 
            if (a.correct) {    // move to next question or give the amount 
                correctAnswer();
                delay(2000, () => {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);
                })

            } else {
                wrongAnswer();
                delay(2000, () => {
                    setStop(true);
                })
            }
        })
    }

    return (
        <div className='trivia'>
            <div className='question'>{question?.question}</div>
            <div className='answers'>
                {question?.answers.map((a) => {
                    return (
                        <div className={selectedAnswer === a ? className : 'answer'}
                            onClick={() => handleClick(a)}
                        >
                            {a.text}
                        </div>
                    )
                })}


            </div>
        </div>
    )
}

export default Trivia