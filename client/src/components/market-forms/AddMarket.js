import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addMarket } from '../../actions/market';
import defaultImg from '../../img/apartment-default.png';

const AddMarket = ({ addMarket, history }) => {
	const [ formData, setFormData ] = useState({
		location: '',
		state: '',
		why_this_property: '',
		min_price: 0,
		max_price: 0,
		min_cap_rate: 0,
		max_cap_rate: 0,
		min_units: 0,
		max_units: 0,
		building_class_type: '',
		unemployment_change: 0,
		population_change: 0,
		employers_list: '',
		vacancy_rate: 0,
		median_rental_rate: 0,
		building_permits: 0
	});
	const [ file, setFile ] = useState('');
	const [ filename, setFileName ] = useState('Choose File');

	const {
		location,
		state,
		why_this_property,
		min_price,
		max_price,
		min_cap_rate,
		max_cap_rate,
		min_units,
		max_units,
		building_class_type,
		unemployment_change,
		population_change,
		employers_list,
		vacancy_rate,
		median_rental_rate,
		building_permits
	} = formData;

	const onChange = (e) => {
		if (e.target.name === 'market_photo') {
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
		for (let property in formData) {
			newFormData.append(property, formData[property]);
		}
		addMarket(newFormData, history, true);
	};
	return (
		<Fragment>
			<h1 className="large text-primary mobile-margin">Add Market Area</h1>
			<div className="wrapper-two-column">
				<div className="description-column">
					<h3 className="description-column__header">Market Area Research</h3>
					<p>
						{' '}
						Record demographic and economic data and property characteristics you are looking to purchase in
						this area
					</p>
					<p className="my-1">
						<small>
							Required fields are marked with <i className="fas fa-asterisk fas__asterisk--red" />
						</small>
					</p>
				</div>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<label className="form__label" htmlFor="marketLocation">
							Market Location <i className="fas fa-asterisk fas__asterisk--red" />
						</label>
						<input
							type="text"
							name="location"
							id="location"
							value={location}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="form-group">
						<label className="form__label" htmlFor="state">
							State <i className="fas fa-asterisk fas__asterisk--red" />
						</label>
						<select
							className="form__select"
							type="text"
							name="state"
							id="state"
							value={state}
							onChange={(e) => onChange(e)}
							required
						>
							<option value="0">Select State</option>
							<option value="AL">AL</option>
							<option value="AK">AK</option>
							<option value="AR">AR</option>
							<option value="AZ">AZ</option>
							<option value="CA">CA</option>
							<option value="CO">CO</option>
							<option value="CT">CT</option>
							<option value="DC">DC</option>
							<option value="DE">DE</option>
							<option value="FL">FL</option>
							<option value="GA">GA</option>
							<option value="HI">HI</option>
							<option value="IA">IA</option>
							<option value="ID">ID</option>
							<option value="IL">IL</option>
							<option value="IN">IN</option>
							<option value="KS">KS</option>
							<option value="KY">KY</option>
							<option value="LA">LA</option>
							<option value="MA">MA</option>
							<option value="MD">MD</option>
							<option value="ME">ME</option>
							<option value="MI">MI</option>
							<option value="MN">MN</option>
							<option value="MO">MO</option>
							<option value="MS">MS</option>
							<option value="MT">MT</option>
							<option value="NC">NC</option>
							<option value="NE">NE</option>
							<option value="NH">NH</option>
							<option value="NJ">NJ</option>
							<option value="NM">NM</option>
							<option value="NV">NV</option>
							<option value="NY">NY</option>
							<option value="ND">ND</option>
							<option value="OH">OH</option>
							<option value="OK">OK</option>
							<option value="OR">OR</option>
							<option value="PA">PA</option>
							<option value="RI">RI</option>
							<option value="SC">SC</option>
							<option value="SD">SD</option>
							<option value="TN">TN</option>
							<option value="TX">TX</option>
							<option value="UT">UT</option>
							<option value="VT">VT</option>
							<option value="VA">VA</option>
							<option value="WA">WA</option>
							<option value="WI">WI</option>
							<option value="WV">WV</option>
							<option value="WY">WY</option>
						</select>
					</div>

					<div className="form-group">
						<label className="form__label" htmlFor="why_this_property">
							Why do you like this property? <i className="fas fa-asterisk fas__asterisk--red" />
						</label>
						<textarea
							type="text"
							name="why_this_property"
							id="why_this_property"
							value={why_this_property}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<div className="grid-two-column">
						<div className="form-group">
							<label className="form__label" htmlFor="min_price">
								Minimum Price
							</label>
							<div className="input-icon">
								<input
									type="number"
									name="min_price"
									id="min_price"
									value={min_price}
									onChange={(e) => onChange(e)}
								/>
								<i>$</i>
							</div>
						</div>
						<div className="form-group">
							<label className="form__label" htmlFor="max_price">
								Maximum Price
							</label>
							<div className="input-icon">
								<input
									type="number"
									name="max_price"
									id="max_price"
									value={max_price}
									onChange={(e) => onChange(e)}
								/>
								<i>$</i>
							</div>
						</div>
					</div>

					<div className="grid-two-column">
						<div className="form-group">
							<label className="form__label" htmlFor="min_cap_rate">
								Minimum Cap Rate
							</label>
							<div className="input-icon input-icon-right">
								<input
									type="number"
									name="min_cap_rate"
									id="min_cap_rate"
									value={min_cap_rate}
									onChange={(e) => onChange(e)}
									min="0"
									max="100"
								/>
								<i>%</i>
							</div>
						</div>

						<div className="form-group">
							<label className="form__label" htmlFor="max_cap_rate">
								Maximum Cap Rate
							</label>
							<div className="input-icon input-icon-right">
								<input
									type="number"
									name="max_cap_rate"
									id="max_cap_rate"
									value={max_cap_rate}
									onChange={(e) => onChange(e)}
								/>
								<i>%</i>
							</div>
						</div>
					</div>

					<div className="grid-two-column">
						<div className="form-group">
							<label className="form__label" htmlFor="min_units">
								Minimum Units
							</label>
							<input
								type="number"
								name="min_units"
								id="min_units"
								value={min_units}
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group">
							<label className="form__label" htmlFor="max_units">
								Maximum Units
							</label>

							<input
								type="number"
								name="max_units"
								id="max_units"
								value={max_units}
								onChange={(e) => onChange(e)}
							/>
						</div>
					</div>

					<div className="form-group">
						<label className="form__label" htmlFor="building_class_type">
							Building Class Type
						</label>
						<select
							className="form__select"
							type="text"
							name="building_class_type"
							id="building_class_type"
							value={building_class_type}
							onChange={(e) => onChange(e)}
							required
						>
							<option value="0">Select building class</option>
							<option value="A">A</option>
							<option value="B">B</option>
							<option value="C">C</option>
							<option value="D">D</option>
						</select>
					</div>

					<div className="form-group">
						<label className="form__label" htmlFor="unemployment_change">
							Unemployment Change
						</label>
						<div className="input-icon input-icon-right">
							<input
								type="number"
								name="unemployment_change"
								id="unemployment_change"
								value={unemployment_change}
								onChange={(e) => onChange(e)}
							/>
							<i>%</i>
						</div>
					</div>

					<div className="form-group">
						<label className="form__label" htmlFor="population_change">
							Population Change
						</label>
						<div className="input-icon input-icon-right">
							<input
								type="number"
								name="population_change"
								id="population_change"
								value={population_change}
								onChange={(e) => onChange(e)}
							/>
							<i>%</i>
						</div>
					</div>

					<div className="form-group">
						<label className="form__label" htmlFor="employers_list">
							Top Employers in Target Market
						</label>
						<input
							type="text"
							name="employers_list"
							id="employers_list"
							value={employers_list}
							onChange={(e) => onChange(e)}
						/>
						<small className="form-text">
							Please use comma separated values (eg. Walmart, McDonalds, Costco)
						</small>
					</div>

					<div className="form-group">
						<label className="form__label" htmlFor="vacancy_rate">
							Vacancy Rate
						</label>
						<div className="input-icon input-icon-right">
							<input
								type="number"
								name="vacancy_rate"
								id="vacancy_rate"
								value={vacancy_rate}
								onChange={(e) => onChange(e)}
							/>
							<i>%</i>
						</div>
					</div>

					<div className="form-group">
						<label className="form__label" htmlFor="median_rental_rate">
							The Median Rental Rate
						</label>
						<div className="input-icon">
							<input
								type="number"
								name="median_rental_rate"
								id="median_rental_rate"
								value={median_rental_rate}
								onChange={(e) => onChange(e)}
							/>
							<i>$</i>
						</div>
					</div>

					<div className="form-group">
						<label className="form__label" htmlFor="building_permits">
							Number of Building Permits
						</label>
						<input
							type="number"
							name="building_permits"
							id="building_permits"
							value={building_permits}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<div className="form-group">
						<div className="form__photo-upload m-1-bottom">
							<img className="form__market-photo" src={defaultImg} alt="Main market" />
							<input
								className="form__upload"
								type="file"
								accept="image/*"
								name="market_photo"
								id="market_photo"
								onChange={(e) => onChange(e)}
							/>
							<label htmlFor="market_photo">{filename}</label>
						</div>
						<p>Maximum upload size: 2 MB</p>
					</div>

					<input type="submit" className="btn btn-primary my-1" value="submit" />
					<Link className="btn btn-light my-1" to="/dashboard-market">
						Go Back
					</Link>
				</form>
			</div>
		</Fragment>
	);
};

export default connect(null, { addMarket })(withRouter(AddMarket));
