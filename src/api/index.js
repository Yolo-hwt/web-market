//对所有api进行统一管理
import requests from "./request";
import mockRequests from './mockRequest';

//三级联动请求地址
// //api/product/getBaseCategoryList    get 无参数
export const reqGetCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });
//获取banner首页轮播图
export const reqGetBannerList = () => mockRequests.get('/banner');
//获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floor');

//获取搜索模块数据
export const reqGetSearchList = (params) => requests({ url: "/list", method: "post", data: params })

//获取商品详情数据
export const reqGoodsInfo = (skuid) => requests({ url: `/item/${skuid}`, method: 'get' });

//添加商品到购物车(获取更新某一个产品的个数)
export const reqAddOrderUpdateShopCart = (skuid, skunum) => requests({ url: `/cart/addToCart/${skuid}/${skunum}`, method: 'post' })

//获取购物车商品列表
// /api/cart/cartList
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车商品
// /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuid) => requests({ url: `/cart/deleteCart/${skuid}`, method: 'delete' })

//修改某一个商品的勾选的状态
export const reqUpdateChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

//获取验证码
export const reqGetVerifyCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

//用户注册
export const reqUserRegister = (userData) => requests({ url: '/user/passport/register', data: userData, method: 'post' });

//用户登录
export const reqUserLogin = (userInfo) => requests({ url: '/user/passport/login', data: userInfo, method: 'post' });

//通过token获取用户信息，在请求头设置
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });

//退出登录
export const reqUserLoginOut = () => requests({ url: '/user/passport/logout', method: 'get' });

//获取用户地址信息
export const reqUserAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });

//获取订单交易信息（商品清单）
export const reqOrdersInfo = () => requests({ url: '/order/auth/trade', method: 'get' });

//提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });

//获取订单支付信息
export const reqOrderInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//查询支付订单状态
export const reqPayOrderStatus = (orderId) => requests({ url: `payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

//获取我的订单列表
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });