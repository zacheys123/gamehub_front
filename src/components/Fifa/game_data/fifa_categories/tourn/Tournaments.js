import { useState, useCallback, useEffect, useRef } from 'react';
import { Container } from '../../../../../css/modes/tournament.js';
import { Button } from '@mui/material';
import { Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useGameContext } from '../../../../../context/context_/GameContext';
import { submitTourn } from '../../../../../context/features/tournamentSlice';
import Points from './Points.jsx';
import Elimination from './Elimination.jsx';

const Tournaments = () => {
	const {
		tournament: {
			points,
			elimination,
			start,
			iserror,
			error,
			success,
			issuccess,
			loading,
		},
		setTournament,
	} = useGameContext();
	const [showform, setForm] = useState(false);

	const variants = {
		initial: {
			x: '100%',
			opacity: 0,
		},
		animate: {
			x: ['100%', '0%', '-5%', '0%'],
			opacity: 0,
			transition: {
				delay: 0.5,
				duration: 0.6,
			},
		},
	};
	const myid = JSON.parse(localStorage.getItem('profile'));
	const id = myid?.result?._id;
	const tournref = useRef();
	const [tournaments, setTourn] = useState({
		facilitator: '',
		tourn_name: '',
		type: '',
		noplayers: '',
		amount: '',
	});
	const handleTourn = (ev) => {
		setTourn({
			...tournaments,
			[ev.target.name]: ev.target.value,
		});
	};

	const handleSubmit = useCallback((ev) => {
		ev.preventDefault();
		submitTourn(tournref, id, setTournament);
	}, []);
	useEffect(() => {
		tournref.current = tournaments;
	}, [tournaments]);
	return (
		<Container>
			{!showform ? (
				<div className="container__div ">
					{!start && (
						<div className="container__div ">
							<Button
								onClick={() => setForm((prev) => !prev)}
								variant="contained"
							>
								Register Tournament
							</Button>
						</div>
					)}{' '}
				</div>
			) : (
				<div style={{ marginTop: '.2rem', height: '100%' }}>
					<div>
						{start && (
							<motion.div
								variant={variants}
								initial="initial"
								animate="animate"
								className=" myform"
							>
								<Form className="card" onSubmit={handleSubmit}>
									<h5 align="center">Register</h5>
									<input
										type="text"
										placeholder="Tournament Facilitator/Host"
										value={tournaments?.facilitator}
										onChange={handleTourn}
										name="facilitator"
									/>
									<input
										value={tournaments?.name}
										onChange={handleTourn}
										type="text"
										name="tourn_name"
										placeholder="Name of Tournament"
									/>
									<Form.Select
										value={tournaments?.type}
										onChange={handleTourn}
										name="type"
										className="text-muted"
									>
										<option>Type of Tournament</option>
										<option value="points">Home/Away(Points)</option>
										<option value="elimination">Elimination</option>
									</Form.Select>
									<input
										value={tournaments?.noplayers}
										onChange={handleTourn}
										name="noplayers"
										type="text"
										placeholder="Number of Players
										(limit 16)"
									/>
									<input
										value={tournaments?.amount}
										onChange={handleTourn}
										name="amount"
										type="text"
										placeholder="Participation Amount"
									/>

									<br />
									{iserror && (
										<p style={{ color: 'red', textAlign: 'center' }}>
											{error}
										</p>
									)}
									{issuccess && (
										<p
											style={{
												color: 'green',
												textAlign: 'center',
											}}
										>
											{success}
										</p>
									)}
									<Button variant="outlined" type="submit">
										{!loading ? 'Submit Tournament' : 'Submitting...'}
									</Button>
								</Form>
							</motion.div>
						)}
					</div>
					{!points && <Points />}
					{elimination && <Elimination />}
				</div>
			)}
		</Container>
	);
};

export default Tournaments;
