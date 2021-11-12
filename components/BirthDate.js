import React, { Component } from 'react';
import { Dropdown } from 'primereact/dropdown';



const Days = [
	{ name: '1', code: '1' },
	{ name: '2', code: '2' },
	{ name: '3', code: '3' },
	{ name: '4', code: '4' },
	{ name: '5', code: '5' },
	{ name: '6', code: '6' },
	{ name: '7', code: '7' },
	{ name: '8', code: '8' },
	{ name: '9', code: '9' },
	{ name: '10', code: '10' },
	{ name: '11', code: '11' },
	{ name: '12', code: '12' },
	{ name: '13', code: '13' },
	{ name: '14', code: '14' },
	{ name: '15', code: '15' },
	{ name: '16', code: '16' },
	{ name: '17', code: '17' },
	{ name: '18', code: '18' },
	{ name: '19', code: '19' },
	{ name: '20', code: '20' },
	{ name: '21', code: '21' },
	{ name: '22', code: '22' },
	{ name: '23', code: '23' },
	{ name: '24', code: '24' },
	{ name: '25', code: '25' },
	{ name: '26', code: '26' },
	{ name: '27', code: '27' },
	{ name: '28', code: '28' },
	{ name: '29', code: '29' },
	{ name: '30', code: '30' },
	{ name: '31', code: '31' }


];
const Mounths = [
	{ name: 'فروردین', code: '1' },
	{ name: 'اردیبهشت', code: '2' },
	{ name: 'خرداد', code: '3' },
	{ name: 'تیر', code: '4' },
	{ name: 'مرداد', code: '5' },
	{ name: 'شهریور', code: '6' },
	{ name: 'مهر', code: '7' },
	{ name: 'آبان', code: '8' },
	{ name: 'آذر', code: '9' },
	{ name: 'دی', code: '10' },
	{ name: 'بهمن', code: '11' },
	{ name: 'اسفند', code: '12' }
];
const Years = [
	{ name: '1301', code: '1301' },
	{ name: '1302', code: '1302' },
	{ name: '1303', code: '1303' },
	{ name: '1304', code: '1304' },
	{ name: '1305', code: '1305' },
	{ name: '1306', code: '1306' },
	{ name: '1307', code: '1307' },
	{ name: '1308', code: '1308' },
	{ name: '1309', code: '1309' },
	{ name: '1310', code: '1310' },
	{ name: '1311', code: '1311' },
	{ name: '1312', code: '1312' },
	{ name: '1313', code: '1313' },
	{ name: '1314', code: '1314' },
	{ name: '1315', code: '1315' },
	{ name: '1316', code: '1316' },
	{ name: '1317', code: '1317' },
	{ name: '1318', code: '1318' },
	{ name: '1319', code: '1319' },
	{ name: '1320', code: '1320' },
	{ name: '1321', code: '1321' },
	{ name: '1322', code: '1322' },
	{ name: '1323', code: '1323' },
	{ name: '1324', code: '1324' },
	{ name: '1325', code: '1325' },
	{ name: '1326', code: '1326' },
	{ name: '1327', code: '1327' },
	{ name: '1328', code: '1328' },
	{ name: '1329', code: '1329' },
	{ name: '1330', code: '1330' },
	{ name: '1331', code: '1331' },
	{ name: '1332', code: '1332' },
	{ name: '1333', code: '1333' },
	{ name: '1334', code: '1334' },
	{ name: '1335', code: '1335' },
	{ name: '1336', code: '1336' },
	{ name: '1337', code: '1337' },
	{ name: '1338', code: '1338' },
	{ name: '1339', code: '1339' },
	{ name: '1340', code: '1340' },
	{ name: '1341', code: '1341' },
	{ name: '1342', code: '1342' },
	{ name: '1343', code: '1343' },
	{ name: '1344', code: '1344' },
	{ name: '1345', code: '1345' },
	{ name: '1346', code: '1346' },
	{ name: '1347', code: '1347' },
	{ name: '1348', code: '1348' },
	{ name: '1349', code: '1349' },
	{ name: '1350', code: '1350' },
	{ name: '1351', code: '1351' },
	{ name: '1352', code: '1352' },
	{ name: '1353', code: '1353' },
	{ name: '1354', code: '1354' },
	{ name: '1355', code: '1355' },
	{ name: '1356', code: '1356' },
	{ name: '1357', code: '1357' },
	{ name: '1358', code: '1358' },
	{ name: '1359', code: '1359' },
	{ name: '1360', code: '1360' },
	{ name: '1361', code: '1361' },
	{ name: '1362', code: '1362' },
	{ name: '1363', code: '1363' },
	{ name: '1364', code: '1364' },
	{ name: '1365', code: '1365' },
	{ name: '1366', code: '1366' },
	{ name: '1367', code: '1367' },
	{ name: '1368', code: '1368' },
	{ name: '1369', code: '1369' },
	{ name: '1370', code: '1370' },
	{ name: '1371', code: '1371' },
	{ name: '1372', code: '1372' },
	{ name: '1373', code: '1373' },
	{ name: '1374', code: '1374' },
	{ name: '1375', code: '1375' },
	{ name: '1376', code: '1376' },
	{ name: '1377', code: '1377' }


];

class BirthDate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			SelectedDay: "-1",
			SelectedMounth: "-1",
			SelectedYear: "-1"
		}







	}


	componentDidMount() {


	}
	
	getDerivedStateFromProps(param) {
		if(param.SelectedDay || param.SelectedMounth || param.SelectedYear){
			this.setState({
				SelectedDay:param.SelectedDay,
				SelectedMounth:param.SelectedMounth,
				SelectedYear:param.SelectedYear
			});
			
		}
		return null;
	}

	render() {

		return (
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div style={{ width: '30%' }}>

					<Dropdown style={{ width: '100%' }} optionLabel="name" value={this.props.SelectedDay} options={Days} onChange={(event) => {
						this.setState({
							SelectedDay: event.target.value
						});
						this.props.callback({ SelectedDay: event.target.value, SelectedMounth: this.props.SelectedMounth, SelectedYear: this.props.SelectedYear });

					}}

						placeholder="روز" />

				</div>
				<div style={{ width: '30%' }}>

					<Dropdown style={{ width: '100%' }} optionLabel="name" value={this.props.SelectedMounth} options={Mounths} onChange={(event) => {
						this.setState({
							SelectedDay: event.target.value
						});
						this.props.callback({ SelectedDay: this.props.SelectedDay, SelectedMounth: event.target.value, SelectedYear: this.props.SelectedYear });

					}} placeholder="ماه" />

				</div>
				<div style={{ width: '30%' }}>

					<Dropdown style={{ width: '100%' }} optionLabel="name" value={this.props.SelectedYear} options={Years} onChange={(event) => {
						this.setState({
							SelectedDay: event.target.value
						});
						this.props.callback({ SelectedDay: this.props.SelectedDay, SelectedMounth: this.props.SelectedMounth, SelectedYear: event.target.value });

					}} placeholder="سال" />

				</div>
			</div>
		)
	}
}
export default BirthDate;