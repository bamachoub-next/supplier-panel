import React, { Fragment } from 'react';




class Cities extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			SelectedCity: this.props.SelectedCity || "",
			SelectedSubCity: this.props.SelectedSubCity || "",
			Cities: [],
			SubCities: [],
			list: { "آذربايجان شرقي": ["اسكو", "اهر", "ایلخچی", "باسمنج", "بستان آباد", "بناب", "تبريز", "تسوج", "جلفا", "خسروشهر", "سراب", "سهند", "شبستر", "صوفیان", "مراغه", "مرند", "ملكان", "ممقان", "ميانه", "هاديشهر", "هريس", "هشترود", "ورزقان"], "آذربايجان غربي": ["اروميه", "اشنويه", "بوكان", "تكاب", "خوي", "سر دشت", "سلماس", "شاهين دژ", "ماكو", "مهاباد", "مياندوآب", "نقده", "پلدشت", "پيرانشهر", "چالدران"], "اردبيل": ["اردبيل", "خلخال", "مشگين شهر", "نمين", "نير", "پارس آباد", "گرمي"], "اصفهان": ["آران و بيدگل", "اردستان", "اصفهان", "باغ بهادران", "تودشک", "تيران", "حاجي آباد", "خميني شهر", "خورزوق", "خوانسار", "درچه", "دهاقان", "دستگرد", "دولت آباد", "زرين شهر", "سین", "سميرم", "شهرضا", "شاهین شهر", "عسگران", "علويجه", "فلاورجان", "گز", "كاشان", "مباركه", "نجف آباد", "نطنز", "ورزنه", "کوهپایه", "گلپايگان"], "ايلام": ["آبدانان", "ايلام", "ايوان", "دره شهر", "دهلران", "سرابله", "مهران"], "بوشهر": ["اهرم", "برازجان", "بوشهر", "جم", "خورموج", "دير", "عسلویه", "كنگان", "کاکی", "گناوه"], "تهران": ["اسلامشهر", "باقرشهر", "بومهن", "تجريش", "تهران", "دماوند", "رباط كريم", "رودهن", "ري", "شريف آباد", "شهريار", "فشم", "فيروزكوه", "قدس", "قرچك", "كهريزك", "لواسان", "ملارد", "ورامين", "پاكدشت", "چهاردانگه"], "چهارمحال بختياري": ["اردل", "بروجن", "شهركرد", "فارسان", "لردگان", "چلگرد"], "خراسان جنوبي": ["بيرجند", "سربيشه", "فردوس", "قائن", "نهبندان"], "خراسان رضوي": ["تايباد", "تربت جام", "تربت حيدريه", "خواف", "درگز", "سبزوار", "سرخس", "طبس", "طرقبه", "فريمان", "قوچان", "كاشمر", "مشهد", "نيشابور", "چناران", "گناباد"], "خراسان شمالي": ["آشخانه", "اسفراين", "بجنورد", "جاجرم", "شيروان"], "خوزستان": ["آبادان", "انديمشك", "اهواز", "ايذه", "ايرانشهر", "باغ ملك", "بندر امام خميني", "بندر ماهشهر", "بهبهان", "حمیدیه", "خرمشهر", "دزفول", "رامشیر", "رامهرمز", "سوسنگرد", "شادگان", "شادگان", "شوش", "شوشتر", "لالي", "مسجد سليمان", "ملاثانی", "هنديجان", "هويزه"], "زنجان": ["آب بر", "ابهر", "خدابنده", "خرمدره", "زنجان", "قيدار", "ماهنشان"], "سمنان": ["ايوانكي", "بسطام", "دامغان", "سمنان", "شاهرود", "گرمسار"], "سيستان و بلوچستان": ["ايرانشهر", "خاش", "زابل", "زاهدان", "سراوان", "سرباز", "ميرجاوه", "چابهار"], "فارس": ["آباده", "اردكان", "ارسنجان", "استهبان", "اقليد", "بوانات", "جهرم", "حاجي آباد", "خرامه", "خنج", "داراب", "زرقان", "سروستان", "سوريان", "سپيدان", "شيراز", "صفاشهر", "فراشبند", "فسا", "فيروز آباد", "كازرون", "لار", "لامرد", "مرودشت", "مهر", "کوار"], "قزوين": ["آبيك", "بوئين زهرا", "تاكستان", "قزوين"], "قم": ["قم"], "کرج": ["اشتهارد", "طالقان", "كرج", "ماهدشت", "نظرآباد", "هشتگرد"], "كردستان": ["بانه", "بيجار", "حسن آباد", "سقز", "سنندج", "صلوات آباد", "قروه", "مريوان"], "كرمان": ["انار", "بافت", "بردسير", "بم", "جيرفت", "راور", "رفسنجان", "زرند", "سيرجان", "كرمان", "كهنوج", "کوهبنان"], "كرمانشاه": ["اسلام آباد غرب", "جوانرود", "سنقر", "صحنه", "قصر شيرين", "كرمانشاه", "كنگاور", "هرسين", "پاوه"], "كهكيلويه و بويراحمد": ["دهدشت", "دوگنبدان", "سي سخت", "ياسوج", "گچساران"], "گلستان": ["آزاد شهر", "آق قلا", "راميان", "علي آباد كتول", "كردكوی", "كلاله", "گرگان", "گنبد كاووس"], "گيلان": ["آستارا", "املش", "تالش", "رشت", "رودبار", "شفت", "صومعه سرا", "فومن", "لاهیجان", "لنگرود", "ماسال", "ماسوله", "منجيل", "هشتپر"], "لرستان": ["ازنا", "الشتر", "اليگودرز", "بروجرد", "خرم آباد", "دزفول", "دورود", "كوهدشت", "ماهشهر", "نور آباد"], "مازندران": ["آمل", "بابل", "بابلسر", "بلده", "بهشهر", "تنكابن", "جويبار", "رامسر", "ساري", "قائم شهر", "محمود آباد", "نكا", "نور", "نوشهر", "چالوس"], "مركزي": ["آشتيان", "اراك", "تفرش", "خمين", "دليجان", "ساوه", "شازند", "محلات"], "هرمزگان": ["بستك", "بندر جاسك", "بندر خمیر", "بندر لنگه", "بندرعباس", "حاجي آباد", "دهبارز", "قشم", "قشم", "كيش", "ميناب"], "همدان": ["اسدآباد", "بهار", "رزن", "ملاير", "نهاوند", "همدان"], "يزد": ["ابركوه", "اردكان", "اشكذر", "بافق", "تفت", "خضرآباد", "زارچ", "طبس", "مهريز", "ميبد", "هرات", "يزد"] },
		}
		this.ChangeCity = this.ChangeCity.bind(this);







	}
	ChangeCity(value, userCahnge) {
		this.setState({
			SelectedCity: value,
			SelectedSubCity: userCahnge ? "" : this.state.SelectedSubCity
		});
		this.setSubCity(value)
	}


	componentDidMount() {
		let options = [""];
		for (let item in this.state.list) {
			options.push(item)
		}
		this.setState({
			Cities: options

		})
		if (this.props.SelectedCity)
			this.ChangeCity(this.props.SelectedCity)

	}


	setSubCity(value) {
		let SubCities = [""];
		let that = this;
		SubCities = value != "" ? SubCities.concat(this.state.list[value]) : SubCities
		this.setState({
			SubCities: SubCities
		})
		setTimeout(function () {
			that.props.callback({ SelectedCity: that.state.SelectedCity, SelectedSubCity: that.state.SelectedSubCity, SubCities: that.state.SubCities });

		}, 0)


	}/*
	componentWillReceiveProps(param) {
        if(param.SelectedCity || param.SelectedSubCity){
			let lastCity = this.state.SelectedCity;
			this.setState({
				SelectedCity:param.SelectedCity,
				SelectedSubCity:param.SelectedSubCity
			});
			if(param.SelectedCity != lastCity){
				let that=this;
				setTimeout(function(){
					that.ChangeCity(param.SelectedCity)
				},0)
			}
		}
    }*/
	render() {

		return (
			<Fragment>
				<div className={this.props.className ? this.props.className : "col-12"}>
					<label htmlFor="name">استان</label>

					{this.state.Cities.length > 0 &&
						<>
							<select style={{ width: '100%' }} disabled={this.props.disabled} className="form-control" onChange={(event) => this.ChangeCity(event.target.value, 1)} value={this.state.SelectedCity}>
								{this.state.Cities.map(function (item, index) {
									if (index == 0)
										return (
											<option value="" >{item}</option>
										)
									else
										return (
											<option value={item} >{item}</option>
										)
								})
								}
							</select>
							<small className={this.props.city_inValid ? "p-error p-d-block" : "p-error p-d-none"}  > استان نمی تواند خالی باشد</small>
						</>

					}
				</div>
				<div className={this.props.className ? this.props.className : "col-12"} style={this.props.className ? {} :  { marginTop: 16 }}>
					<label htmlFor="name">شهر</label>

					<select style={{ width: '100%' }} disabled={this.props.disabled} className="form-control" onChange={(event) => {
						this.setState({
							SelectedSubCity: event.target.value
						});
						this.props.callback({ SelectedCity: this.state.SelectedCity, SelectedSubCity: event.target.value, SubCities: this.state.SubCities });

					}} value={this.state.SelectedSubCity}>
						{this.state.SubCities.map(function (item, index) {
							if (index == 0)
								return (
									<option value="" >{item}</option>
								)
							else
								return (
									<option value={item} >{item}</option>
								)
						})
						}
					</select>
					<small className={this.props.subCity_inValid ? "p-error p-d-block" : "p-error p-d-none"}  >شهر  نمی تواند خالی باشد</small>


				</div>



			</Fragment>
		)
	}
}
export default Cities;