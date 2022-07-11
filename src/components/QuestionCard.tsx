import React from 'react';
import DOMpurify from 'dompurify';
import { AnswerObject } from '../App';


interface QuestionCardProps {
    question: string,
    answers: string[],
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined,
    questionNr: number,
    totalQuestions: number
}

export const QuestionCard = (props: QuestionCardProps) => {
    const {
        question,
        answers,
        callback,
        userAnswer,
        questionNr,
        totalQuestions
    } = props

    return (
        <div>
            <p className={"number"}>Question: {questionNr} / {totalQuestions}</p>
            <p dangerouslySetInnerHTML={{__html: DOMpurify.sanitize(question)}}/>
            <div>
                {answers.map(answer =>
                    <div key={answer}>
                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html: DOMpurify.sanitize(answer)}}/>
                        </button>
                    </div>
                )}
            </div>
        </div>)

}