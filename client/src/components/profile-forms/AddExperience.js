import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
	const [ formData, setFormData ] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});

	const [ toDateDisable, toggleDisabled ] = useState(false);

	const { company, title, location, from, to, current, description } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	return (
		<Fragment>
			<h1 className="large text-primary mobile-margin">Add Experience</h1>
			<div className="wrapper-two-column">
				<div className="description-column">
					<h3 className="description-column__header">Experience</h3>
					<p>Add your work experience</p>
					<p className="my-1">
						<small>
							Required fields are marked with <i className="fas fa-asterisk fas__asterisk--red" />
						</small>
					</p>
				</div>

				<form
					className="form"
					onSubmit={(e) => {
						e.preventDefault();
						addExperience(formData, history);
					}}
				>
					<div className="form-group">
						<label className="form__label" htmlFor="title">
							Job Title <i className="fas fa-asterisk fas__asterisk--red" />
						</label>
						<input
							type="text"
							name="title"
							id="title"
							value={title}
							required
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="company">
							Company <i className="fas fa-asterisk fas__asterisk--red" />
						</label>
						<input
							type="text"
							name="company"
							id="company"
							value={company}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="location">
							Location
						</label>
						<input
							type="text"
							name="location"
							id="location"
							value={location}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="from">
							From Date
						</label>
						<input type="date" name="from" id="from" value={from} onChange={(e) => onChange(e)} />
					</div>
					<div className="form-group">
						<p>
							<input
								type="checkbox"
								name="current"
								checked={current}
								value={current}
								onChange={(e) => {
									setFormData({ ...formData, current: !current });
									toggleDisabled(!toDateDisable);
								}}
							/>{' '}
							Current Job{' '}
						</p>
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="to">
							To Date
						</label>
						<input
							type="date"
							name="to"
							id="to"
							value={to}
							onChange={(e) => onChange(e)}
							disabled={toDateDisable ? 'disabled' : ''}
						/>
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="description">
							Job Description
						</label>
						<textarea
							name="description"
							id="description"
							cols="30"
							rows="5"
							value={description}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<input type="submit" className="btn btn-primary my-1" value="submit" />
					<Link className="btn btn-light my-1" to="/dashboard">
						Go Back
					</Link>
				</form>
			</div>
		</Fragment>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(withRouter(AddExperience));
