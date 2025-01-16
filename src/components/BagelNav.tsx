import { Navbar, NavbarItem, NavbarSpacer } from './ui/navbar';
import { useGameContext } from '../context/gameContext';

export function BagelNav() {
    const { activeGame } = useGameContext();
    // let category = null;
    let currentPlayer = null;
    if (activeGame) {
        // category = (
        //     <NavbarItem>
        //         <span className='text-lg font-bold'>
        //             {activeGame.currentPrompt.category}
        //         </span>
        //     </NavbarItem>
        // );
        currentPlayer = activeGame.currentPlayer ? (
            <NavbarItem>{activeGame.currentPlayer}</NavbarItem>
        ) : null;
    }
    return (
        <Navbar className="bg-steel-blue-200">
            {currentPlayer}
            <NavbarSpacer />
            <NavbarItem href="/">
                <img src="/simple-bagel-blitz-fullsize.png" alt="Bagel Blitz" className="h-10" />
            </NavbarItem>
        </Navbar>
    )
}

export default BagelNav;