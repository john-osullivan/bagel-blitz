import React from "react";
import { useNavigate } from 'react-router';

const RulesPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center min-h-screen h-[100%] lg:px-6 px-2 bg-steel-blue-200 text-black">
            <h1 className="text-4xl lg:mt-[16vh] mt-[8vh] font-bold mb-6 text-center">The Rules of Bagel-topia</h1>
            <div className="text-lg leading-relaxed max-w-prose space-y-2">
                <p>
                    The game is <strong>Bagel Blitz</strong>. It celebrates mutual
                    understanding and absurdly fast connection under a temple of JJ and
                    Liz-ness. Applicable for all sorts of situations of hanging out.
                    Everybody wins because it's not really a game.
                </p>
                <p>
                    Play for as many rounds as possible (recommended 7) of each person
                    traveling through Bagel-topia. Traveling through Bagel-topia means
                    doing the random-generator of categories (attached) then accomplishing
                    a question/dare from that category.
                </p>
                <p>
                    The categories are: <strong>MiaFord</strong>, <strong>BeanTown</strong>, <strong>Sullivan Street</strong>, <strong>The Society Room</strong>, <strong>Fidlar Swift</strong>, <strong>Italy</strong>, and <strong>Ever More Golden</strong>.
                </p>

                <p className="font-bold">Special rules:</p>
                <ul className="list-disc list-inside space-y-4">
                    <li>
                        <strong>SIMMONS:</strong> If a player takes too long to answer,
                        another player may declare “SIMMONS” (buzzer-beater mode). This
                        declaration effectively enacts a bet between the two players. If the
                        question-answerer answers their question within 7 seconds (JJ and
                        Liz birth month), the wager-er must drink. If they do not, the
                        question-answerer must drink.
                    </li>
                    <li>
                        <strong>STREET RULES:</strong> If someone goes on their phone too
                        much, swipe that out of their hands and throw it.
                    </li>
                    <li>
                        Substitute drinking with any other sort of penalty, of course.
                    </li>
                </ul>
            </div>
            <button
                onClick={() => navigate("/")}
                className="my-8 max-w-prose w-full bg-primary text-black font-bold py-4 px-8 rounded hover:bg-secondary transition"
            >
                Home
            </button>
        </div>
    );
};

export default RulesPage;
