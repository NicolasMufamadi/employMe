import { useState } from "react"

export default function Faqs() {

    const [faqs,setFaqs] = useState([
        {
            id: 1,
            question: "How do I write an effective resume and cover letter?",
            answer: "For the resume: Choose the right format, be clear and concise, add contact information, work experience, education, skills and achievements if any.For the cover letter: Address the hiring manager, have an introduction, showcase your fit and highlight your enthusiasm. Don’t forget to polish and proofread your letter and keep your letter organized and concise. Ideally one page in length."
        },
        {
            id: 2,
            question: "What should I include in my job application? ",
            answer: "Resume, cover letter, references, portfolio of work samples (if relevant), transcripts or certification (if requested) and application form (if applicable)"
        },
        {
            id: 3,
            question: "How do I prepare for an interview?",
            answer: "Research the company, review the job description, practice common interview questions, research the interviewers, dress appropriately, prepare questions to ask, practice good body language, stay updated on industry trends and prepare for any technical assessments. Don’t forget to stay calm and confident!"
        },
        {
            id: 4,
            question: "How can I improve my networking and job search strategies?",
            answer: "For Networking Strategies: Set clear goals, leverage online platforms, attend industry events, join professional groups, and attend industry events.For Job Search Industries: Use job search engines, set up alerts, volunteer or intern, attend career fairs, utilize recruitment agencies and stay persistent."
        },
        {
            id: 5,
            question: "What is the best way to follow up after an interview? ",
            answer: "Send a thank you email, inquire about next steps, reiterate your interests, address unanswered questions, keep it concise and always remember to use a professional tone."
        },
        {
            id: 6,
            question: "How do I handle gaps in my employment history?",
            answer: "Be honest, address in your resume, explain in the cover letter, show continuous learning, demonstrate relevant achievement, emphasize transferable skills and don’t forget to practice confidence!"
        }
    ])

    return(
       <>
          <div className="container">
             <h2 className="mt-3">Frequently Asked Questions</h2>
             {
                faqs.map((faq,index) => {
                    return(
                        <div>
                            <ul key={index} className="list-group mt-3">
                               <li className="list-group-item">
                                   <div className="ms-2 me-auto">
                                    <div className="fw-bold" >
                                        {faq.question}
                                    </div>
                                     {faq.answer}
                                   </div>
                               </li>
                            </ul>
                        </div>    
                    )
                })
             }
          </div>
       </>
    )
}