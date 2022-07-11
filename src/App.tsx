import React, {useState} from 'react';

// components
import {QuestionCard} from "./components/QuestionCard";
import {fetchQuestionsFromAPI, QuestionState} from "./API";

//Types
import {Difficulty} from "./API";

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

const TOTAL_QUESTIONS = 10

function App() {

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true)


    const startQuiz = async () => {
        setGameOver(false)
        setLoading(true);

        const newQuestions = await fetchQuestionsFromAPI(TOTAL_QUESTIONS, Difficulty.EASY);
        setQuestions(newQuestions)
        setScore(0)
        setUserAnswers([])
        setNumber(0)
        setLoading(false)
    }

    const questionValidator = (x: string) => {
        const regs = /\w.*/g
        // figure out correct expression for regex matching. Use the link below: https://regex101.com/
        //then continue with project https://www.youtube.com/watch?v=F2JCjVSZlG0
        const matches = x.match(regs);

        if (matches) {
            for (var i = 0; i < matches.length; i++) {
                return matches[i];
            }
        }
        return 'There is no question'
    }

    const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            //users answer
            const answer = event.currentTarget.value;
            // check answer vs correct answer
            const correct = questions[number].correct_answer === answer
            //Add score if answer is correct
            if (correct) setScore(prev => prev + 1)
            //save score for user answers
            const userAnswer = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            };
            setUserAnswers((prev) => [...prev, userAnswer]);
        }
    };
    console.log(userAnswers)
    console.log(questions)

    const nextQuestion = () => {
        const nextQuestion = number + 1;
        if (nextQuestion === TOTAL_QUESTIONS) {
            setGameOver(true);
        } else {
            setNumber(nextQuestion);
        }


    }

    return (
        <div className="App">
            <h1>Quiz Game</h1>
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                <button className="Start" onClick={startQuiz}>
                    Start
                </button>
            ) : null}
            {!gameOver ? (<p className={"score"}>Score: {score}</p>) : null}
            {loading && <p>Loading Questions...</p>}
            {!loading && !gameOver && (
                <QuestionCard
                    questionNr={number + 1}
                    totalQuestions={TOTAL_QUESTIONS}
                    question={questionValidator(questions[number].question)}
                    answers={questions[number].answers}
                    userAnswer={userAnswers ? userAnswers[number] : undefined}
                    callback={checkAnswer}
                />
            )}
            {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
                <button className={"nextQuestion"} onClick={nextQuestion}>
                    Next Question
                    {}
                </button>
            ) : null}
        </div>
    );
}

export default App;
