<template>
  <div class="right_main_under">
    <el-form :inline="true"  class="search_select_form"  size="mini">
      <el-form-item label="访问时间">
        <el-date-picker
          v-model="dateValue_create"
          type="datetimerange"
          :change="date_change(dateValue_create,1)"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          align="right">
        </el-date-picker>
      </el-form-item>


      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="类型" clearable  @clear="status_clearFun">
          <el-option
            v-for="item in selectData.typeData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="诈骗网站IP" >
        <el-input v-model="form.bilkWebIp"  placeholder="诈骗网站IP" prefix-icon="el-icon-search" ></el-input>
      </el-form-item>
      <el-form-item label="诈骗网站端口" >
        <el-input v-model="form.bilkWebPort"  placeholder="诈骗网站端口" prefix-icon="el-icon-search" ></el-input>
      </el-form-item>
      <el-form-item label="诈骗金额" >
        <el-input v-model="form.bilkAmount"  placeholder="诈骗金额" prefix-icon="el-icon-search" ></el-input>
      </el-form-item>
      <el-form-item label="受害人地理位置" >
        <el-input v-model="form.victimLocation"  placeholder="受害人地理位置" prefix-icon="el-icon-search" ></el-input>
      </el-form-item>
      <el-form-item label="危害等级">
        <el-select v-model="form.hazardLevel" placeholder="危害等级">
            <el-option
                    v-for="item in selectData.hazardLevelData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
     </el-form-item>
      <el-form-item label="诈骗网站国家与省份">
        <el-cascader
          v-model="countryData"
          :options="selectData.bilkWebCountryData"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
          clearable
        ></el-cascader>

<!--        <el-select v-model="form.bilkWebCountry" placeholder="诈骗网站国家">-->
<!--          <el-option-->
<!--            v-for="item in selectData.bilkWebCountryData"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->

      </el-form-item>
      <el-form-item label="诈骗网站域名与端口">
          <el-input v-model="form.bilkWebDomainAndPort"  placeholder="诈骗网站域名与端口" prefix-icon="el-icon-search" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" size="mini"  @click="resetFun"><i class="el-icon-refresh el-icon--left"></i>重置</el-button>
        <el-button type="primary" size="mini"  @click="searchTabData" :loading="isLoading"  v-prevent-click><i class="el-icon-search el-icon--left"></i>查询</el-button>
        <el-tooltip class="item" effect="dark" content="根据查询条件筛选数据后,将筛选的数据推送至相关平台进行预警处理" placement="top">
          <template>
            <el-popconfirm
              confirm-button-text='是'
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              @confirm="pushData"
              title="是否确定将根据查询条件获取的数据推送至相关平台进行预警处理？">
              <el-button slot="reference" type="success" size="mini"   :loading="isLoadingOther"  v-prevent-click><i class="el-icon-sort el-icon--left"></i>查询推送</el-button>
            </el-popconfirm>
          </template>
        </el-tooltip>


      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="650px"
      size="mini"
      class="tableStyle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="类型">
              <span>{{ props.row.type | toStatusOfType }}</span>
            </el-form-item>
            <el-form-item label="访问时间">
              <span>{{ props.row.interviewTime }}</span>
            </el-form-item>
            <el-form-item label="受害人访问IP">
              <span>{{ props.row.victimIp }}</span>
            </el-form-item>
            <el-form-item label="受害人访问端口">
              <span>{{ props.row.victimPort }}</span>
            </el-form-item>
            <el-form-item label="诈骗网站IP">
              <span>{{ props.row.bilkWebIp }}</span>
            </el-form-item>
            <el-form-item label="诈骗网站端口">
              <span>{{ props.row.bilkWebPort }}</span>
            </el-form-item>
            <el-form-item label="受害人姓名">
              <span>{{ props.row.victimName }}</span>
            </el-form-item>
            <el-form-item label="受害人身份证号">
              <span>{{ props.row.victimIdCardNum }}</span>
            </el-form-item>

            <el-form-item label="受害人银行卡信息">
              <span>{{ props.row.victimBankcardNum }}</span>
            </el-form-item>
            <el-form-item label="受害人手机号">
              <span>{{ props.row.victimPhoneNum }}</span>
            </el-form-item>
            <el-form-item label="手机号详细信息">
              <span>{{ props.row.victimPhoneDetail }}</span>
            </el-form-item>
            <el-form-item label="诈骗金额">
              <span>{{ props.row.bilkAmount }}</span>
            </el-form-item>
            <el-form-item label="受害人地理位置">
              <span>{{ props.row.victimLocation }}</span>
            </el-form-item>
            <el-form-item label="地理位置置信度">
              <span>{{ props.row.victimLocalReliable }}</span>
            </el-form-item>
            <el-form-item label="危害等级">
              <span>{{ props.row.hazardLevel | toStatusOfHazardLevel}}</span>
            </el-form-item>

            <el-form-item label="诈骗网站国家">
              <span>{{ props.row.bilkWebCountry }}</span>
            </el-form-item>
            <el-form-item label="诈骗网站省份">
            <span>{{ props.row.bilkWebProvince }}</span>
          </el-form-item>
            <el-form-item label="诈骗网站域名与端口">
            <span>{{ props.row.bilkWebDomainAndPort }}</span>
          </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        prop="type" show-overflow-tooltip>
        <template scope="scope">
          <el-tag
            :type="scope.row.type === 1 ? 'primary' : (scope.row.type === 2  ? 'success':'danger')"
            disable-transitions>
            {{scope.row.type | toStatusOfType }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="访问时间"
        prop="interviewTime" show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="诈骗网站IP"
        prop="bilkWebIp" show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="诈骗网站端口"
        prop="bilkWebPort" show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="诈骗金额"
        prop="bilkAmount" show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="受害人地理位置"
        prop="victimLocation" show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="危害等级"
        prop="hazardLevel" show-overflow-tooltip>
        <template scope="scope">
          <el-tag
            :type="scope.row.hazardLevel === 'l' ? 'success' : (scope.row.hazardLevel === 'm'  ? 'primary':'danger')"
            disable-transitions>
            {{scope.row.hazardLevel | toStatusOfHazardLevel }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="诈骗网站国家"
        prop="bilkWebCountry" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="诈骗网站省份"
        prop="bilkWebProvince" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="诈骗网站域名与端口"
        prop="bilkWebDomainAndPort" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
      label="诈骗金额"
      prop="bilkAmount" show-overflow-tooltip>
    </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="mypageable.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="mypageable.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagePagination pageRight"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "ruleFeatures",
    data() {
      return {
        dateValue_create: '',
        countryData:'',
        form: {
          type:null,
          interviewTime:null,
          victimIp:null,
          victimPort:null,
          bilkWebIp:null,
          bilkWebPort:null,
          victimName:null,
          victimIdCardNum:null,
          victimBankcardNum:null,
          victimPhoneNum:null,
          victimPhoneDetail:null,
          bilkAmount:null,
          victimLocation:null,
          victimLocalReliable:null,
          hazardLevel:null,
          bilkWebCountry:null,
          bilkWebProvince:null,
          bilkWebDomainAndPort:null,
        },
        tableData: [

        ],
        mypageable: {
          pageSize: 10,
          pageNum: 1,
        },
        total: 1,
        currentPage: 1,
        multipleSelection: '',
        selectData: {
          //1:贷款 2:理财3:客服4:杀猪盘5:公检法6:刷单
          typeData: [
            {value: '1', label: '贷款'},
            {value: '2', label: '理财'},
            {value: '3', label: '客服'},
            {value: '4', label: '杀猪盘'},
            {value: '5', label: '公检法'},
            {value: '6', label: '刷单'},
          ],
          hazardLevelData: [
            {value: 'h', label: '高'},
            {value: 'm', label: '中'},
            {value: 'l', label: '低'},
          ],
          bilkWebCountryData: [
            {
              value: 'China',
              label: '中国',
              children: [
                {
                  value: 'hk',
                  label: '香港特别行政区',
                },
                {
                  value: 'shanghai',
                  label: '上海',
                },
                {
                  value: 'beijing',
                  label: '北京',
                },
                {
                  value: 'tianjin',
                  label: '天津',
                },
              ]
            },
            {
              value: 'Japan',
              label: '日本',
              children: [
                {
                  value: 'Osaka',
                  label: '大阪',
                },
                {
                  value: 'Hokkaido',
                  label: '北海道',
                },
              ]
            },
          ],
        },
        isLoading: false,
        isLoadingOther:false,
      }
    },

    created() {
      this.getTabData()
    },
    methods: {

      //初始化获取数据
      async getTabData() {
        //确定mypageable的存放位置
        let formData = {
          fieldMap:this.form,
          pageNum:this.mypageable.pageNum,
          pageSize:this.mypageable.pageSize,
        }

        // const {data:res} = await this.$http.post('/es/getRulelist',formData)
        let res = {
          "code": 200,
          "data": {
            "content": [
              {
                type:1,
                interviewTime:"2021-05-12 06:24:22",
                victimIp:"49.232.144.245",
                victimPort:"41785",
                bilkWebIp:"168.63.206.80",
                bilkWebPort:"10020",
                victimName:"国仁成",
                victimIdCardNum:"371899*********1233",
                victimBankcardNum:"邮政储蓄银行6217996100101769022",
                victimPhoneNum:"13198188391",
                victimPhoneDetail:"四川 南充 联通",
                bilkAmount:"10000.0",
                victimLocation:"中国 北京市 北京市",
                victimLocalReliable:"100.00",
                hazardLevel:"l",
                bilkWebCountry:"中国",
                bilkWebProvince:"香港特别行政区",
                bilkWebDomainAndPort:"622313.com:10020",
              },
              {
                type:2,
                interviewTime:"2021-05-12 06:24:22",
                victimIp:"49.232.144.245",
                victimPort:"41785",
                bilkWebIp:"168.63.206.80",
                bilkWebPort:"10020",
                victimName:"国仁成",
                victimIdCardNum:"371899*********1233",
                victimBankcardNum:"邮政储蓄银行6217996100101769022",
                victimPhoneNum:"13198188391",
                victimPhoneDetail:"四川 南充 联通",
                bilkAmount:"10000.0",
                victimLocation:"中国 北京市 北京市",
                victimLocalReliable:"100.00",
                hazardLevel:"l",
                bilkWebCountry:"日本",
                bilkWebProvince:"大阪",
                bilkWebDomainAndPort:"622313.com:10020",
              },
              {
                type:6,
                interviewTime:"2021-05-12 06:24:22",
                victimIp:"49.232.144.245",
                victimPort:"41785",
                bilkWebIp:"168.63.206.80",
                bilkWebPort:"10020",
                victimName:"国仁成",
                victimIdCardNum:"371899*********1233",
                victimBankcardNum:"邮政储蓄银行6217996100101769022",
                victimPhoneNum:"13198188391",
                victimPhoneDetail:"四川 南充 联通",
                bilkAmount:"10000.0",
                victimLocation:"中国 北京市 北京市",
                victimLocalReliable:"100.00",
                hazardLevel:"l",
                bilkWebCountry:"日本",
                bilkWebProvince:"北海道",
                bilkWebDomainAndPort:"622313.com:10020",
              },
              {
                type:5,
                interviewTime:"2021-05-12 06:24:22",
                victimIp:"49.232.144.245",
                victimPort:"41785",
                bilkWebIp:"168.63.206.80",
                bilkWebPort:"10020",
                victimName:"国仁成",
                victimIdCardNum:"371899*********1233",
                victimBankcardNum:"邮政储蓄银行6217996100101769022",
                victimPhoneNum:"13198188391",
                victimPhoneDetail:"四川 南充 联通",
                bilkAmount:"10000.0",
                victimLocation:"中国 北京市 北京市",
                victimLocalReliable:"100.00",
                hazardLevel:"l",
                bilkWebCountry:"日本",
                bilkWebProvince:"大阪",
                bilkWebDomainAndPort:"622313.com:10020",
              },
              {
                type:1,
                interviewTime:"2021-05-12 06:24:22",
                victimIp:"49.232.144.245",
                victimPort:"41785",
                bilkWebIp:"168.63.206.80",
                bilkWebPort:"10020",
                victimName:"国仁成",
                victimIdCardNum:"371899*********1233",
                victimBankcardNum:"邮政储蓄银行6217996100101769022",
                victimPhoneNum:"13198188391",
                victimPhoneDetail:"四川 南充 联通",
                bilkAmount:"10000.0",
                victimLocation:"中国 北京市 北京市",
                victimLocalReliable:"100.00",
                hazardLevel:"m",
                bilkWebCountry:"中国",
                bilkWebProvince:"香港特别行政区",
                bilkWebDomainAndPort:"622313.com:10020",
              },
              {
                type:2,
                interviewTime:"2021-05-12 06:24:22",
                victimIp:"49.232.144.245",
                victimPort:"41785",
                bilkWebIp:"168.63.206.80",
                bilkWebPort:"10020",
                victimName:"国仁成",
                victimIdCardNum:"371899*********1233",
                victimBankcardNum:"邮政储蓄银行6217996100101769022",
                victimPhoneNum:"13198188391",
                victimPhoneDetail:"四川 南充 联通",
                bilkAmount:"10000.0",
                victimLocation:"中国 北京市 北京市",
                victimLocalReliable:"100.00",
                hazardLevel:"m",
                bilkWebCountry:"中国",
                bilkWebProvince:"香港特别行政区",
                bilkWebDomainAndPort:"622313.com:10020",
              },
              {
                type:3,
                interviewTime:"2021-05-12 06:24:22",
                victimIp:"49.232.144.245",
                victimPort:"41785",
                bilkWebIp:"168.63.206.80",
                bilkWebPort:"10020",
                victimName:"国仁成",
                victimIdCardNum:"371899*********1233",
                victimBankcardNum:"邮政储蓄银行6217996100101769022",
                victimPhoneNum:"13198188391",
                victimPhoneDetail:"四川 南充 联通",
                bilkAmount:"10000.0",
                victimLocation:"中国 北京市 北京市",
                victimLocalReliable:"100.00",
                hazardLevel:"m",
                bilkWebCountry:"中国",
                bilkWebProvince:"香港特别行政区",
                bilkWebDomainAndPort:"622313.com:10020",
              },
              {
                type:4,
                interviewTime:"2021-05-12 06:24:22",
                victimIp:"49.232.144.245",
                victimPort:"41785",
                bilkWebIp:"168.63.206.80",
                bilkWebPort:"10020",
                victimName:"国仁成",
                victimIdCardNum:"371899*********1233",
                victimBankcardNum:"邮政储蓄银行6217996100101769022",
                victimPhoneNum:"13198188391",
                victimPhoneDetail:"四川 南充 联通",
                bilkAmount:"10000.0",
                victimLocation:"中国 北京市 北京市",
                victimLocalReliable:"100.00",
                hazardLevel:"h",
                bilkWebCountry:"中国",
                bilkWebProvince:"香港特别行政区",
                bilkWebDomainAndPort:"622313.com:10020",
              },
              {
                type:4,
                interviewTime:"2021-05-12 06:24:22",
                victimIp:"49.232.144.245",
                victimPort:"41785",
                bilkWebIp:"168.63.206.80",
                bilkWebPort:"10020",
                victimName:"国仁成",
                victimIdCardNum:"371899*********1233",
                victimBankcardNum:"邮政储蓄银行6217996100101769022",
                victimPhoneNum:"13198188391",
                victimPhoneDetail:"四川 南充 联通",
                bilkAmount:"10000.0",
                victimLocation:"中国 北京市 北京市",
                victimLocalReliable:"100.00",
                hazardLevel:"h",
                bilkWebCountry:"中国",
                bilkWebProvince:"香港特别行政区",
                bilkWebDomainAndPort:"622313.com:10020",
              },   {
                type:4,
                interviewTime:"2021-05-12 06:24:22",
                victimIp:"49.232.144.245",
                victimPort:"41785",
                bilkWebIp:"168.63.206.80",
                bilkWebPort:"10020",
                victimName:"国仁成",
                victimIdCardNum:"371899*********1233",
                victimBankcardNum:"邮政储蓄银行6217996100101769022",
                victimPhoneNum:"13198188391",
                victimPhoneDetail:"四川 南充 联通",
                bilkAmount:"10000.0",
                victimLocation:"中国 北京市 北京市",
                victimLocalReliable:"100.00",
                hazardLevel:"h",
                bilkWebCountry:"中国",
                bilkWebProvince:"香港特别行政区",
                bilkWebDomainAndPort:"622313.com:10020",
              },


            ],
            "first": true,
            "last": true,
            "number": 0,
            "numberOfElements": 0,
            "pageable": {
              "offset": 0,
              "pageNumber": 0,
              "pageSize": 0,
              "paged": true,
              "sort": {
                "sorted": true,
                "unsorted": true
              },
              "unpaged": true
            },
            "size": 0,
            "sort": {
              "sorted": true,
              "unsorted": true
            },
            "totalElements": 10,
            "totalPages": 0
          },
          "expandData": {},
          "message": "string"
          }


        if(res.code == 200){
          this.tableData = []
          if (res.data.content){
            this.tableData = res.data.content
            this.total = res.data.totalElements
            this.totalPages = res.data.totalPages
          }
        }else{
          this.$message.error("查询错误！");
        }

        //加载无论成功与否，都要去掉loading
        this.isLoading = false
      },

      //查询
      searchTabData() {
        this.isLoading = true
        this.mypageable.pageNum = 1
        this.getTabData()
      },

      //下拉框自带清空方法重写 由于 后端需要将传输数据全部默认值为null
      status_clearFun() {
        this.form.status = null
      },

      //下载模板
      async downloadTemp(){
        const { data: res } = await this.$http.post(
          "/es/downRuleTemplate",
        );
        if (res.code == 200) {
          let url = res.expandData.url;
          let eleLink = document.createElement("a");
          eleLink.download = name;
          eleLink.href = url;
          eleLink.click();
          eleLink.remove();
        }
      },

      //重置form
      resetFun() {
        this.form = {
          type:null,
          interviewTime:null,
          victimIp:null,
          victimPort:null,
          bilkWebIp:null,
          bilkWebPort:null,
          victimName:null,
          victimIdCardNum:null,
          victimBankcardNum:null,
          victimPhoneNum:null,
          victimPhoneDetail:null,
          bilkAmount:null,
          victimLocation:null,
          victimLocalReliable:null,
          hazardLevel:null,
          bilkWebCountry:null,
          bilkWebProvince:null,
          bilkWebDomainAndPort:null,
        }
        this.countryData = null
        this.dateValue_create = null
      },
      //操作
      async operateFun(type){
        //处理multipleSelection 数据
        let mulArr = []
        let multipleSel = this.multipleSelection
        if(multipleSel.length > 0){
          for(let i = 0;i < multipleSel.length;i++){
            mulArr.push(multipleSel[i].id)
          }
        }else{
          this.$message.error("请至少选择一条规则数据！");
        }

        let status = "2"
        if(type === 2){
          status = "3"
        }else if(type === 3){//2
          status = "4"
        }

        const opeData =  {
          "id": mulArr,
          "status": status,
        }
        const {data:res} = await this.$http.post('/es/changeRuleList',opeData)

        if(res.code == 200){
          let length = this.multipleSelection.length;
          let message = status == "2" ? '已批量通过'+length+'条数据！':(status == "3"? '已批量停用'+length+'条数据！' : (status == "4" ? '已批量删除'+length+'条数据！' : "操作成功！"));
          this.$message({
            message: message,
            type: "success",
          });
          setTimeout(()=>{
            this.getTabData()
          },3000)

        }else{
          this.$message.error("操作失败！");
        }
      },

      //日期格式化
      date_change(val, typeDate) {
        if (typeDate == 1) {
          if (val && val != "") {
            this.form.startCreateTime = val[0]
            this.form.endCreateTime = val[1]
          } else {
            this.form.startCreateTime = null
            this.form.endCreateTime = null
          }
        } else if (typeDate == 2) {
          if (val && val != "") {
            this.form.startUpdateTime = val[0]
            this.form.endUpdateTime = val[1]
          } else {
            this.form.startUpdateTime = null
            this.form.endUpdateTime = null
          }
        }
      },

      //复选框取值操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      //分页数量
      handleSizeChange(val) {
        this.mypageable.pageSize = val
        this.getTabData()
      },

      //页码跳转
      handleCurrentChange(val) {
        this.mypageable.pageNum = val
        this.getTabData()
      },

      //上传
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
            files.length + fileList.length
          } 个文件`
        );
      },

      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },

      successSendFile(res) {
        if (res.code == 200) {
          setTimeout(()=>{
            this.getTabData()
            this.$message.success("上传成功");
          },3000)

        } else {
          this.$message.warning("上传失败");
        }
      },


       //级联选择器
      handleChange(value) {
        console.log(value);
        //处理数据
      },

      pushData(){
        this.$message.success('已推送10条数据至相关平台进行预警处理'
        );
      }

    },
    filters: {
      toStatusOfType: function (value) {
        let status = "";
        switch (value) {
          case 1: //0
            status = "贷款";
            break;
          case 2: //1
            status = "理财";
            break;
          case 3: //1
            status = "客服";
            break;
          case 4: //1
            status = "杀猪盘";
            break;
          case 5: //1
            status = "公检法";
            break;
          case 6: //1
            status = "刷单";
            break;
          default:
            status = "暂无";
            break;
        }
        return status;
      },
      //toStatusOfAccess
      toStatusOfHazardLevel: function (value) {
        let status = "";
        switch (value) {
          case "l": //0
            status = "低";
            break;
          case "m": //1
            status = "中";
            break;
          case "h": //1
            status = "高";
            break;
          default:
            status = "暂无";
            break;
        }
        return status;
      },
    },
  }
</script>

<style scoped lang="less">
  /deep/ .el-table__fixed-right::before, .el-table__fixed::before{
    background-color:#192d45;
  }
  /deep/.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #03112359;
  }
  /deep/.el-table--border::after, .el-table--group::after, .el-table::before{
    background-color:#192d45 !important;
  }

  .upload_demo {
    margin-left: 0.625rem;
    display: inline-block;
    /deep/.el-upload--text {
      height: 0px;
      width: 0px;
      line-height: 0px;
      display: inline;
      background-color: rgba(0, 0, 0, 0);
      border: 0;
    }
    /deep/.el-upload-list {
      display: inline-block;
    }

    /deep/.el-upload-list__item {
      line-height: 1;
    }

    /deep/.el-upload-list__item:first-child {
      margin-top: 0px;
    }
    /deep/.el-upload-list__item-name,
    /deep/.el-upload-list__item {
      display: inline;
    }
    /deep/.el-upload-list__item:hover {
      background-color: #00000000;
    }
    /deep/.el-upload-list__item .el-icon-close {
      top: 0;
    }
  }
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
    width: 320px;
  }
</style>
