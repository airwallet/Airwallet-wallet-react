import React, { Component } from 'react';
import { 
	View, 
	Text,
	ListView, 
	StyleSheet,
	Image, 
	ScrollView, 
	TouchableOpacity 
} from 'react-native';
import { colors, fonts } from '../../../constants/variables'
import {  SwipeListView, SwipeRow  } from '../../../components/swipeList';
import AddButton from '../../../components/CricleImgBorder';
import Loader from '../../../components/loader';
import {Languages} from '../../../components//Languages/All_languages'
import {getAsyncStorage} from '../../../utils/asyncStorage'
import { USER_INFO } from '../../../constants/api'
import { connect } from 'react-redux';
class SwipList extends Component {
    constructor(props) {
		super(props);
		Languages.setLanguage(global.code);
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state={
			searchEnable: false,
			active: 'wallet',
			scrollEnable: true,
			sortEnable: false,
		 
		}
	 
	}
             


	getTotalUsd = (rate, amount) => { 
		return Number(rate) * Number(amount)
	}
      
    render(){
        const {confirmed} =this.props.getUserInfo  
        const { currenciesList } = this.props;
          
        return(
             <ScrollView 
				scrollEnabled={this.state.scrollEnable}
				style={styles.scrollView}>
				<View style={styles.content} >
					<SwipeListView
						useFlatList             
						scrollEnabled={false}     
						data={currenciesList}
						leftOpenValue={75}
						rightOpenValue={-150}
						previewOpenValue={-40}
						previewOpenDelay={3000}  
						onRowOpen={ this.props.openDetail }
						onRowClose={ this.props.fadeOut }
						disableRightSwipe={true}
						swipeGestureBegan={()=>this.setState({scrollEnable: false})}
						onRowClose={() => this.setState({scrollEnable: true})}
						renderItem={ (data, rowMap) => (
						<SwipeRow                                    
							leftOpenValue={20 + Math.random() * 150}
							rightOpenValue={-150}
							stopLeftSwipe={1}
							closeOnRowBeginSwipe={true}
							swipeToOpenPercent={100}
							disableRightSwipe={true}
							autoClose={true}
							style={{height: 80, borderBottomColor: colors.borderGrey, borderBottomWidth: 1, justifyContent:'center', marginHorizontal: 10}}
						>
							<TouchableOpacity onPress={() => { }} style={{flex:1}}>
								<View style={styles.rowBack}>
									<Text style={{color:'#fff'}}>{Languages.LEFT}</Text>
									<View style={[ styles.backRightBtnLeft]}>
										<Text style={{color:'#fff',fontSize:15, fontFamily: fonts.nunitoLight}}>{Languages.SEND}</Text>
									</View>                                     
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.props.navigation.navigate('cyptoTransationDetail', { data: data.item})} activeOpacity={1} style={styles.cryptoList}>
								<View style={styles.listRow}>
									<View style={styles.cyptoImage}>
										<View style={styles.image2}>
											<Image  style={{width: 30, height: 30}} source={{uri: data.item.icon}}/>
										</View>
											<Text numberOfLines={1} style={styles.right_top_s2}>{data.item.symbol}</Text>
									</View>
									<View style={styles.cyptoTitle}>
										<Text style={styles.middle_txt_s}>{Math.round(data.item.price_usd * 1000) / 1000} USD</Text>
									</View>
									<View style={styles.right_s}>
										<Text numberOfLines={1} style={styles.right_top_s}>{data.item.balance}</Text>
										<View style={styles.listRow2}>
											<Text numberOfLines={1} style={{color: colors.textDark, fontFamily: fonts.nunitoLight}}>≈</Text>
											<Text numberOfLines={1} style={styles.right_bottom_s}>{this.getTotalUsd(data.item.price_usd, data.item.balance)} USD</Text>
										</View>
									</View>
								</View>
							</TouchableOpacity>                                   
						</SwipeRow> )}                                                                              
					/>
				</View>
				 <AddButton 
					title= {Languages.ADD_WALLET} 
					onPress = {() => this.props.toggleCurrenciesList(true)}
					style={{marginVertical: 30}} 
					disabled={!confirmed}
				/>  
				{this.props.updating ? <Loader loadingTxt="Updating... "/> : null}
			</ScrollView>
        )
    }
}



const styles = StyleSheet.create({

	
	scrollView: {
		// paddingBottom: 20,
		height: '100%',
	},

	content: {
		flex: 1,
		height: '100%',
	},

	image2: {
		justifyContent: 'flex-start',
		justifyContent: 'center',
		height: 45,
		width: 45,
		borderRadius: 5,
		paddingBottom: 10,
		paddingTop: 10,
	},

	cryptoList: {
		backgroundColor: '#fff',
		height:80,
		borderBottomWidth: 1,
		borderBottomColor: colors.borderGrey,
		elevation: 100,
	},

	listRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 50,
	},

	listRow2: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},

	cyptoImage: {
		padding: 10,
		height: 80,
		width: 80,
		flex: 1,
		flexDirection: 'row',        
		alignItems: 'center',     
	},

	cyptoTitle: {
		flex: 2,
		padding: 10,
		marginLeft: 10,
		justifyContent: 'center',
	},

	rowBack: {//need
		alignItems: 'center',
		backgroundColor: 'white',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
		marginBottom: 5,
	},

	backRightBtnLeft: {
		justifyContent:'center',
		alignItems: 'center',
		backgroundColor: colors.lightGrey,
		borderRadius: 25,
		width:90,
		height:30,
		right: 10,
	},

	middle_txt_s:{
		color: colors.textDark,
		textAlign:'center',
		fontSize:20,
		fontFamily: fonts.nunitoLight
	},

	right_top_s:{
		color: colors.textDark,       
		fontSize: 12,
		textAlign:'right',
		fontFamily: fonts.nunitoLight
	},

	right_top_s2:{
		color: colors.textHead,       
		fontSize:20,
		textAlign:'right',
		fontFamily: fonts.nunitoLight
	},

	right_bottom_s:{
		color: colors.orange,        
		fontSize: 12,
		textAlign:'right',
		fontFamily: fonts.nunitoLight
	},

	right_s: {
		flex: 1,
		paddingRight: 10,
		paddingBottom: 10,
		paddingTop: 10,
		width:50,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
})

// export default Home;

const mapStateToProps = (state) => ({
	getUserInfo: state.userInfo.get('userInfo'),
  });
  
export default connect(mapStateToProps, { })(SwipList); 
  
  
 