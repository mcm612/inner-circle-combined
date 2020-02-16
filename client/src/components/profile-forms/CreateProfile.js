import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import defaultImg from '../../img/default.jpg';
const CreateProfile = ({ createProfile, history }) => {
	const [ formData, setFormData ] = useState({
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		bio: '',
		profilephoto: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: ''
	});
	const [ file, setFile ] = useState('');
	const [ filename, setFileName ] = useState('Choose File');

	const [ displaySocialInputs, toggleSocialInputs ] = useState(false);

	const {
		company,
		website,
		location,
		status,
		skills,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram
	} = formData;

	const onChange = (e) => {
		if (e.target.name === 'profilephoto') {
			setFile(e.target.files[0]);
			setFileName(e.target.files[0].name);
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const newFormData = new FormData();
		newFormData.append('file', file);
		//profilephoto will be assigned to URL photo path on server side after multer does processing
		//create new object omitting profilephoto property
		const { profilephoto, ...formDataModified } = formData;
		for (let property in formDataModified) {
			newFormData.append(property, formDataModified[property]);
		}
		createProfile(newFormData, history);
	};
	return (
		<Fragment>
			<h1 className="large text-primary mobile-margin">Investor Profile</h1>
			<div className="wrapper-two-column">
				<div className="description-column">
					<h3 className="description-column__header">Investor Details</h3>
					<p>This profile will be shared with other real estate investors to help you connect</p>
					<p className="my-1">
						<small>
							Required fields are marked with <i className="fas fa-asterisk fas__asterisk--red" />
						</small>
					</p>
				</div>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<label className="form__label" htmlFor="status">
							Investor Type <i className="fas fa-asterisk fas__asterisk--red" />
						</label>
						<select
							className="form__select"
							name="status"
							id="status"
							value={status}
							onChange={(e) => onChange(e)}
						>
							<option value="0">Select Professional Status</option>
							<option value="Seasoned Investor">Seasoned Investor</option>
							<option value="Senior Investor">Senior Investor</option>
							<option value="Intermediate Investor">Intermediate Investor</option>
							<option value="Beginner Investor">Beginner Investor</option>
							<option value="Student or Learning">Student or Learning</option>
							<option value="Instructor">Instructor or Teacher</option>
							<option value="Other">Other</option>
						</select>
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="company">
							Company
						</label>
						<input type="text" name="company" id="company" value={company} onChange={(e) => onChange(e)} />
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="website">
							Website
						</label>
						<input type="text" name="website" id="website" value={website} onChange={(e) => onChange(e)} />
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
						<small className="form-text">City & state suggested (eg. Miami, FL)</small>
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="skills">
							Skills <i className="fas fa-asterisk fas__asterisk--red" />
						</label>
						<input type="text" name="skills" id="skills" value={skills} onChange={(e) => onChange(e)} />
						<small className="form-text">
							Please use comma separated values (eg. analysis, lead-generation, syndicator)
						</small>
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="bio">
							A Short Bio
						</label>
						<textarea name="bio" id="bio" value={bio} onChange={(e) => onChange(e)} />
					</div>
					<div className="form-group form__photo-upload">
						<img className="form__user-photo" src={defaultImg} alt="default investor" />
						<input
							className="form__upload"
							type="file"
							accept="image/*"
							name="profilephoto"
							id="profilephoto"
							onChange={(e) => onChange(e)}
						/>
						<label htmlFor="profilephoto">{filename}</label>
					</div>

					<div className="my-2">
						<button
							onClick={() => toggleSocialInputs(!displaySocialInputs)}
							type="button"
							className="btn btn-light"
						>
							Add Social Network Links
						</button>
						<span>Optional</span>
					</div>

					{displaySocialInputs && (
						<Fragment>
							<div className="form-group social-input">
								<i className="fab fa-twitter fa-2x" />
								<input
									type="text"
									placeholder="Twitter URL"
									name="twitter"
									value={twitter}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-facebook fa-2x" />
								<input
									type="text"
									placeholder="Facebook URL"
									name="facebook"
									value={facebook}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-youtube fa-2x" />
								<input
									type="text"
									placeholder="YouTube URL"
									name="youtube"
									value={youtube}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-linkedin fa-2x" />
								<input
									type="text"
									placeholder="Linkedin URL"
									name="linkedin"
									value={linkedin}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-instagram fa-2x" />
								<input
									type="text"
									placeholder="Instagram URL"
									name="instagram"
									value={instagram}
									onChange={(e) => onChange(e)}
								/>
							</div>
						</Fragment>
					)}

					<input type="submit" value="save settings" className="btn btn-primary my-1" />
					<Link className="btn btn-light my-1" to="/dashboard">
						Go Back
					</Link>
				</form>
			</div>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
