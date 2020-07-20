const list=[
  {
    'cust_no':'ECFSDHBFHSJNFF',
    'doc_no':'b7e3h45h23443n2',
    'custno_belong_brch_desc':'206上海分行',
    'cust_name':'刘4a606afgssw34642sdsa',
    'doctyp_cd':'0104',
    'warn_dt':'2019-07-13',
    'custno_belong_bnkoutls_desc':'206088上海徐汇支行',
  },{
    'cust_no':'ECFSDHBFHSJNFF',
    'doc_no':'b7e3h45h23443n2',
    'custno_belong_brch_desc':'206上海分行',
    'cust_name':'刘4a606afgssw34642sdsa',
    'doctyp_cd':'0104',
    'warn_dt':'2019-07-13',
    'custno_belong_bnkoutls_desc':'206088上海徐汇支行',
  },{
    'cust_no':'ECFSDHBFHSJNFF',
    'doc_no':'b7e3h45h23443n2',
    'custno_belong_brch_desc':'206南京支行',
    'cust_name':'张4a606afgssw34642sdsa',
    'doctyp_cd':'0104',
    'warn_dt':'2019-07-13',
    'custno_belong_bnkoutls_desc':'206088南京淮海支行',
  }
]

module.exports = function(router) {
  router.post('/mock/ceshi/echarts', function(req, res, next) {
    res.json({
      message: {},
      payload: {
        'result':list
      },
      success: true
    });
  });
};
