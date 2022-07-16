import { Dialog } from "@headlessui/react";
import {
	createContext,
	ReactComponentElement,
	useContext,
	useRef,
	useState,
} from "react";
import {
	Button,
	ButtonGroup,
	Divider,
	Hero,
	Table,
	Theme,
	useTheme,
} from "react-daisyui";
import { useAuthState } from "~/components/contexts/UserContext";
import { SignInButton } from "~/components/domain/auth/SignInButton";
import { SignOutButton } from "~/components/domain/auth/SignOutButton";
import useUndoableCounter, { Counter, Step } from "~/hooks/undoableCounter";

// State
function Index() {
	// <ButtonGroup className="mx-auto grid grid-cols-2 max-w-120">
	//				 	<Button>Undo</Button>
	//				 	<Button>Redo</Button>
	//				 </ButtonGroup>
	return (
		<>
			<Theme dataTheme="customTheme">
				<Hero>
					<Hero.Content className="text-center">
						<h1 className="text-5xl font-bold">Undoable Counter</h1>
					</Hero.Content>
				</Hero>
				<UndoableCounter />
			</Theme>
		</>
	);
}

const UndoableCounter = () => {
	const { counter, incr, decr } = useUndoableCounter({
		counter: 0,
		index: 0,
		steps: [],
	});
	return (
		<>
			<div className="grid grid-cols-3 w-1/3 mx-auto">
				{/*
					<HistoryControl />
						*/}
				<StepLeftButtonGroup decr={decr} />
				<CounterValue counter={counter} />
				<StepRightButtonGroup incr={incr} />
				<History counter={counter} />
			</div>
		</>
	);
};

export default Index;

const CounterValue: React.FC<{ counter: Counter }> = ({ counter }) => {
	return (
		<div className="text-center justify-center flex items-center">
			<span className="text-3xl">{counter.counter}</span>
		</div>
	);
};

const StepLeftButtonGroup: React.FC<{
	decr: (magnitude: -100 | -10 | -1) => void;
}> = ({ decr }) => {
	const mags: (-1 | -10 | -100)[] = [-100, -10, -1];
	return (
		<div className="btn-group items-center justify-center">
			{mags.map((mag) => (
				<Button key={mag} onClick={() => decr(mag)}>
					{mag}
				</Button>
			))}
		</div>
	);
};

const StepRightButtonGroup: React.FC<{
	incr: (magnitude: 100 | 10 | 1) => void;
}> = ({ incr }) => {
	const mags: (1 | 10 | 100)[] = [+1, +10, +100];
	return (
		<div className="btn-group items-center justify-center">
			{mags.map((mag) => (
				<Button key={mag} onClick={() => incr(mag)}>
					+{mag}
				</Button>
			))}
		</div>
	);
};

const History: React.FC<{ counter: Counter }> = ({ counter }) => {
	return (
		<div className="col-span-3 grid grid-cols-1">
			<div className="col-span-1 flex items-center justify-center my-4">
				<span className="text-3xl">History</span>
			</div>
			<div className="grid grid-cols-1">
				<Table compact={true}>
					<Table.Head>
						<span key="index">Index</span>
						<span key="step">Step</span>
						<span key="history">Old -&gt; New</span>
					</Table.Head>
					<Table.Body>
						{counter.steps
							.filter(
								(step: Step) => step.type === "incr" || step.type === "decr"
							)
							.map((step: Step) => {
								switch (step.type) {
									case "decr":
										return (
											<Table.Row key={step.index}>
												<span key={step.index}>{step.index}</span>
												<span>{step.magnitude}</span>
												<span>
													{step.old} -&gt; {step.old + step.magnitude}
												</span>
											</Table.Row>
										);
									case "incr":
										return (
											<Table.Row key={step.index}>
												<span key={step.index}>{step.index}</span>
												<span>{step.magnitude}</span>
												<span>
													{step.old} -&gt; {step.old + step.magnitude}
												</span>
											</Table.Row>
										);
									default:
										return <></>;
								}
							})}
					</Table.Body>
				</Table>
			</div>
		</div>
	);
};

const HistoryNavigate: React.FC<
	{
		undo: () => void;
		redo: () => void;
	} & React.HTMLAttributes<HTMLDivElement>
> = ({ undo, redo }) => {
	return (
		<>
			<ButtonGroup className="col-span-1 items-center justify-center">
				<Button onClick={undo}>Undo</Button>
				<Button onClick={redo}>Redo</Button>
			</ButtonGroup>
		</>
	);
};
