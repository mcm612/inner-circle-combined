import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
	const [ formData, setFormData ] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});

	const [ toDateDisable, toggleDisabled ] = useState(false);

	const { school, degree, fieldofstudy, from, to, current, description } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	return (
		<Fragment>
			<h1 className="large text-primary mobile-margin">Add Education</h1>
			<div className="wrapper-two-column">
				<div className="description-column">
					<h3 className="description-column__header">Education</h3>
					<p> Add school or Real Estate bootcamp you have attended</p>
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
						addEducation(formData, history);
					}}
				>
					<div className="form-group">
						<label className="form__label" htmlFor="school">
							School or Bootcamp <i className="fas fa-asterisk fas__asterisk--red" />
						</label>
						<input
							type="text"
							name="school"
							id="school"
							value={school}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="degree">
							Degree or Certificate <i className="fas fa-asterisk fas__asterisk--red" />
						</label>
						<input
							type="text"
							name="degree"
							id="degree"
							value={degree}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="fieldofstudy">
							Field of Study <i className="fas fa-asterisk fas__asterisk--red" />
						</label>
						<input
							type="text"
							name="fieldofstudy"
							id="fieldofstudy"
							value={fieldofstudy}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="from">
							From Date <i className="fas fa-asterisk fas__asterisk--red" />
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
							Current School
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

addEducation.propTypes = {
	addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
