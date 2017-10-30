<template>
  <el-row>
    <el-col :offset="1" :span="22">
      <h3>外呼设置</h3>
      <el-tabs v-model.trim="activeName" type="card" @tab-click="tabChange">
        <el-tab-pane label="号显" name="first">
          <el-form ref="NumberDisplayform" label-width="150px" :inline="true">
            <el-form-item label="外呼显示">
              <el-select v-model.trim="NumberDisplay.id201" placeholder="小号">
                <el-option label="小号" value="V"></el-option>
                <el-option label="员工号码" value="T"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="记录显示客户号码">
              <el-select v-model.trim="NumberDisplay.id202" placeholder="真实">
                <el-option label="真实" value="T"></el-option>
                <el-option label="部分" value="P"></el-option>
                <el-option label="无" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="外发短信包含">
              <el-select v-model.trim="NumberDisplay.id203" placeholder="无">
                <el-option label="无" value="N"></el-option>
                <el-option label="员工号码" value="T"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="记录显示客户号码">
              <el-select v-model.trim="NumberDisplay.id204" placeholder="真实">
                <el-option label="真实" value="T"></el-option>
                <el-option label="部分" value="P"></el-option>
                <el-option label="无" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="回电显示">
              <el-select v-model.trim="NumberDisplay.id205" placeholder="客户号码">
                <el-option label="客户号码" value="T"></el-option>
                <el-option label="小号" value="V"></el-option>
                <el-option label="指定小号" value="S"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="记录显示客户号码">
              <el-select v-model.trim="NumberDisplay.id206" placeholder="真实">
                <el-option label="真实" value="T"></el-option>
                <el-option label="部分" value="P"></el-option>
                <el-option label="无" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="回复短信包含">
              <el-select v-model.trim="NumberDisplay.id207" placeholder="无">
                <el-option label="小号" value="T"></el-option>
                <el-option label="员工号码" value="V"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="记录显示客户号码">
              <el-select v-model.trim="NumberDisplay.id208" placeholder="真实">
                <el-option label="真实" value="T"></el-option>
                <el-option label="部分" value="P"></el-option>
                <el-option label="无" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="陌生来电显示">
              <el-select v-model.trim="NumberDisplay.id209" placeholder="客户号码">
                <el-option label="客户号码" value="T"></el-option>
                <el-option label="小号" value="V"></el-option>
                <el-option label="指定小号" value="S"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="记录显示客户号码">
              <el-select v-model.trim="NumberDisplay.id210" placeholder="真实">
                <el-option label="真实" value="T"></el-option>
                <el-option label="部分" value="P"></el-option>
                <el-option label="无" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="陌生短信包含">
              <el-select v-model.trim="NumberDisplay.id211" placeholder="客户号码">
                <el-option label="客户号码" value="T"></el-option>
                <el-option label="小号" value="V"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="记录显示客户号码">
              <el-select v-model.trim="NumberDisplay.id212" placeholder="真实">
                <el-option label="真实" value="T"></el-option>
                <el-option label="部分" value="P"></el-option>
                <el-option label="无" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="keepNumberDisplay">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="彩铃" name="second">
          <el-form ref="clform" label-width="150px">
            <el-form-item label="外呼主叫：">
              <el-select v-model.trim="CLform.id213" placeholder="无">
                <el-option label="主叫侧彩铃" value="A"></el-option>
                <el-option label="官网来电" value="O"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="外呼被叫：">
              <el-select v-model.trim="CLform.id214" placeholder="无">
                <el-option label="主叫侧彩铃" value="A"></el-option>
                <el-option label="官网来电" value="O"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="回电主叫：">
              <el-select v-model.trim="CLform.id215" placeholder="无">
                <el-option label="主叫侧彩铃" value="A"></el-option>
                <el-option label="官网来电" value="O"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="回电被叫：">
              <el-select v-model.trim="CLform.id216" placeholder="无">
                <el-option label="主叫侧彩铃" value="A"></el-option>
                <el-option label="官网来电" value="O"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="陌生主叫：">
              <el-select v-model.trim="CLform.id217" placeholder="无">
                <el-option label="主叫侧彩铃" value="A"></el-option>
                <el-option label="官网来电" value="O"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="外呼主叫：">
              <el-select v-model.trim="CLform.id218" placeholder="无">
                <el-option label="主叫侧彩铃" value="A"></el-option>
                <el-option label="官网来电" value="O"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="陌生被叫：">
              <el-select v-model.trim="CLform.id219" placeholder="无">
                <el-option label="主叫侧彩铃" value="A"></el-option>
                <el-option label="官网来电" value="O"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="keepCL">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="挂机短信" name="third">
          <el-form ref="SMSonhookform" label-width="150px">
            <el-form-item label="外呼发给员工：">
              <span>已接通</span>
              <el-select v-model.trim="SmsOnHookform.id220" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
              <span>&nbsp;&nbsp;未接通</span>
              <el-select v-model.trim="SmsOnHookform.id221" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
              <span>&nbsp;&nbsp;提前挂机</span>
              <el-select v-model.trim="SmsOnHookform.id222" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="外呼发给客户：">
              <span>已接通</span>
              <el-select v-model.trim="SmsOnHookform.id223" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
              <span>&nbsp;&nbsp;未接通</span>
              <el-select v-model.trim="SmsOnHookform.id224" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
              <span>&nbsp;&nbsp;未振铃</span>
              <el-select v-model.trim="SmsOnHookform.id225" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="回电发给员工：">
              <span>已接通</span>
              <el-select v-model.trim="SmsOnHookform.id226" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
              <span>&nbsp;&nbsp;未接通</span>
              <el-select v-model.trim="SmsOnHookform.id227" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
              <span>&nbsp;&nbsp;未振铃</span>
              <el-select v-model.trim="SmsOnHookform.id228" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="回电发给客户：">
              <span>已接通</span>
              <el-select v-model.trim="SmsOnHookform.id229" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
              <span>&nbsp;&nbsp;未接通</span>
              <el-select v-model.trim="SmsOnHookform.id230" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
              <span>&nbsp;&nbsp;提前挂机</span>
              <el-select v-model.trim="SmsOnHookform.id231" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="陌生来电发给员工：">
              <span>已接通</span>
              <el-select v-model.trim="SmsOnHookform.id232" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
              <span>&nbsp;&nbsp;未接通</span>
              <el-select v-model.trim="SmsOnHookform.id233" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
              <span>&nbsp;&nbsp;未振铃</span>
              <el-select v-model.trim="SmsOnHookform.id234" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="陌生来电发给客户：">
              <span>已接通</span>
              <el-select v-model.trim="SmsOnHookform.id235" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
              <span>&nbsp;&nbsp;未接通</span>
              <el-select v-model.trim="SmsOnHookform.id236" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
              <span>&nbsp;&nbsp;提前挂机</span>
              <el-select v-model.trim="SmsOnHookform.id237" placeholder="无">
                <el-option label="已接通客户侧短信" value="1"></el-option>
                <el-option label="未接通客户侧短信" value="2"></el-option>
                <!-- <el-option label="已接通员工侧短信" value="AC"></el-option> -->
                <!-- <el-option label="未接通员工侧短信" value="AD"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="keepSmsOnHook">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="绑定设置" name="fourth">
          <el-form ref="bindingform" label-width="150px">
            <el-form-item label="绑定有效时长(s)：">
             <!-- <el-slider v-model.trim="bindingform.id238" :min="0" :max="3600" :step="10" show-input></el-slider> 滑块-->
              <el-input-number v-model.trim="bindingform.id238" :min="1" :max="3600" :step="10"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-checkbox label="是否振铃解绑" v-model.trim="bindingform.id239" true-label="Y" false-label="N"></el-checkbox>
              <el-checkbox label="通话后是否解绑" v-model.trim="bindingform.id240" true-label="Y" false-label="N"></el-checkbox>
              <el-checkbox label="连续重复绑定" v-model.trim="bindingform.id241" true-label="Y" false-label="N"></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="keepBinding">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="客户池" name="fifth">
          <el-input style="width:200px;" placeholder="按姓名或员工编号查询"></el-input>
          <el-button type="primary" @click="queryClientPool">查询</el-button>
          <!-- 表格 ——start-->
          <el-table ref="multipleTable" :data="tableData1" border tooltip-effect="dark" v-loading="tableLoading1" element-loading-text="拼命加载中" style="width: 100%">
            <el-table-column prop="" label="员工编号">
            </el-table-column>
            <el-table-column prop="" label="号码">
            </el-table-column>
            <el-table-column prop="" label="创建时间">
            </el-table-column>
            <el-table-column prop="" label="备注">
            </el-table-column>
          </el-table>
          <br>
          <!-- 表格 ——end-->
          <!-- 分页 —— start-->
          <el-row>
            <el-col :offset="8">
              <el-pagination @current-change="currentChange1" :current-page.sync="currentPage1" :page-size="10" layout="prev, pager, next, jumper,total" :total="100">
              </el-pagination>
            </el-col>
          </el-row>
          <!-- 分页 —— end-->
        </el-tab-pane>
        <el-tab-pane label="员工信息" name="sixth">
          <el-input style="width:200px;" placeholder="按员工编号查询"></el-input>
          <el-button type="primary" @click="queryAdviserInfo">查询</el-button>
          <!-- 表格 ——start-->
          <el-table ref="multipleTable" :data="tableData2" border tooltip-effect="dark" v-loading="tableLoading2" element-loading-text="拼命加载中" style="width: 200%">
            <el-table-column prop="" label="员工编号">
            </el-table-column>
            <el-table-column prop="" label="创建时间">
            </el-table-column>
            <el-table-column prop="" label="信息">
            </el-table-column>
          </el-table>
          <br>
          <!-- 表格 ——end-->
          <!-- 分页 —— start-->
          <el-row>
            <el-col :offset="8">
              <el-pagination @current-change="currentChange2" :current-page.sync="currentPage2" :page-size="10" layout="prev, pager, next, jumper" :total="100">
              </el-pagination>
            </el-col>
          </el-row>
          <!-- 分页 —— end-->
        </el-tab-pane>
        <el-tab-pane label="当地绑定" name="seventh">
          <el-input style="width:200px;" v-model.trim="searchBind.number" placeholder="按号码查询"></el-input>
          <el-button type="primary" @click="queryLocalBind">查询</el-button>
          <!-- <el-button type="primary" @click="AddLocalBind">新增</el-button> -->
          <!-- 表格 ——start-->
          <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" v-loading="tableLoading3" element-loading-text="拼命加载中" style="width: 200%">
            <el-table-column prop="xnum" label="小号">
            </el-table-column>
            <el-table-column prop="bnum" label="客户号码">
            </el-table-column>
            <el-table-column prop="anum" label="主叫号码">
            </el-table-column>
            <el-table-column prop="code" label="员工编号">
            </el-table-column>
            <el-table-column prop="name" label="员工姓名">
            </el-table-column>
            <!--    <el-table-column prop="" label="参数">
                  </el-table-column>
                  <el-table-column prop="" label="客户编号">
                  </el-table-column> -->
            <el-table-column prop="" label="操作">
              <template scope="scope">
                <el-button size="small" @click="unBing(scope.$index, scope.row)">解绑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br>
          <!-- 表格 ——end-->
          <!-- 分页 —— start-->
          <el-row>
            <el-col :offset="8">
              <el-pagination @current-change="currentChange3" :current-page.sync="currentPage3" :page-size="pageSize3" layout="prev, pager, next, jumper,total" :total="totalrecord3">
              </el-pagination>
            </el-col>
          </el-row>
          <!-- 分页 —— end-->
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      // 号显
      NumberDisplay: {
        id201: "",
        id202: "",
        id203: "",
        id204: "",
        id205: "",
        id206: "",
        id207: "",
        id208: "",
        id209: "",
        id210: "",
        id211: "",
        id212: "",
      },
      // 彩铃
      CLform: {
        id213: "A",
        id214: "A",
        id215: "A",
        id216: "A",
        id217: "A",
        id218: "A",
        id219: "A",
      },
      // 挂机短信
      SmsOnHookform: {},
      // 绑定设置
      bindingform: {
        id238: "300",
      },
      // 客户池
      tableData1: [],
      tableLoading1: false,
      currentPage1: 1,
      // 员工信息
      tableData2: [],
      tableLoading2: false,
      currentPage2: 1,
      // 当地绑定
      searchBind: { number: '' },
      tableData3: [],
      tableLoading3: false,
      currentPage3: 1,
      pageSize3: 1,
      totalrecord3: 0,
    };
  },
  methods: {
    tabChange(tab, event) {
      // console.log(tab, event);
    },
    // ***** 号显
    // 保存号显状态
    keepNumberDisplay() {
      let keepND = JSON.stringify(this.NumberDisplay)
      this.$axios.get('parameter_addCallOutNumber.action?jsonData=' + keepND).then(response => {
        this.$message({ message: "保存成功！", type: 'success', });
      }, response => {
        this.$message({ message: "保存失败：" + response, type: 'error', });
      })
    },
    // 获取号显状态
    getNumberDisplay() {
      this.$axios.get('parameter_getCallOutNumber.action').then(response => {
        this.NumberDisplay = JSON.parse(response.data);
      }, response => {
        this.$message({ message: "获取号显失败：" + response, type: 'error', });
      })
    },
    // ***** 彩铃
    // 保存彩铃
    keepCL() {
      let keepCL = JSON.stringify(this.CLform)
      this.$axios.get('parameter_addCallOutMusic.action?jsonData=' + keepCL).then(response => {
        this.$message({ message: "保存成功！", type: 'success', });
      }, response => {
        this.$message({ message: "保存失败：" + response, type: 'error', });
      })
    },
    // 获取彩铃
    getCL() {
      this.$axios.get('parameter_getCallOutMusic.action').then(response => {
        this.CLform = JSON.parse(response.data);
      }, response => {
        this.$message({ message: "获取彩铃失败：" + response, type: 'error', });
      })
    },
    // ***** 挂机短信
    // 保存挂机短信
    keepSmsOnHook() {
      let keepSmsOnHook = JSON.stringify(this.SmsOnHookform)
      this.$axios.get('parameter_addCallOutMessage.action?jsonData=' + keepSmsOnHook).then(response => {
        this.$message({ message: "保存成功！", type: 'success', });
      }, response => {
        this.$message({ message: "保存失败：" + response, type: 'error', });
      })
    },
    // 获取挂机短信
    getSmsOnHook() {
      this.$axios.get('parameter_getCallOutMessage.action').then(response => {
        this.SmsOnHookform = JSON.parse(response.data);
      }, response => {
        this.$message({ message: "获取挂机短信失败：" + response, type: 'error', });
      })
    },
    // ***** 绑定
    // 保存绑定设置
    keepBinding() {
      console.log(JSON.stringify(this.bindingform))
      this.$axios.post('parameter_addCallOutBinding.action','jsonData=' + JSON.stringify(this.bindingform)).then(response => {
        this.getBinding()
        this.$message({ message: "保存成功！", type: 'success', });
      }, response => {
        this.$message({ message: "保存失败：" + response, type: 'error', });
      })
    },
    // 获取绑定设置
    getBinding() {
      this.$axios.get('parameter_getCallOutBinding.action').then(response => {
        console.log(response.data)
        this.bindingform = JSON.parse(response.data);
      }, response => {
        this.$message({ message: "获取绑定设置失败：" + response, type: 'error', });
      })
    },
    // ***** 客户池
    // 查询客户池
    queryClientPool() {
      this.tableLoading1 = true;
      this.$axios.get('url').then(response => {
        this.tableLoading1 = false;
        this.tableData1 = JSON.parse(response.data)
      }, response => {
        this.tableLoading1 = false;
        this.tableData1 =[];
        this.$message({ message: "查询客户池失败：" + response, type: 'error', });
      })
    },
    // 分页变化
    currentChange1() {},
    // ***** 员工信息
    // 查询员工信息
    queryAdviserInfo() {
      this.tableLoading2 = true;
      this.$axios.get('url').then(response => {
        this.tableLoading2 = false;
        this.tableData2 = JSON.parse(response.data)
        this.$message({ message: "保存成功！", type: 'success', });
      }, response => {
        this.tableLoading2 = false;
        this.tableData2 =[];
        this.$message({ message: "查询员工信息失败：" + response, type: 'error', });
      })
    },
    // 分页变化
    currentChange2() {},

    // ***** 当地绑定
    // 查询当地绑定
    queryLocalBind() {
      this.searchBind.currentPage = this.currentPage3;
      this.getBindTable()
    },
    // 分页变化时触发
    currentChange3(val) {
      this.searchBind.currentPage = val;
      this.getBindTable()
    },
    // 获取当地绑定的数据
    getBindTable() {
      this.tableLoading3 = true;
      console.log(JSON.stringify(this.searchBind))
      this.$axios.post('ax_queryList.action','jsonData=' + JSON.stringify(this.searchBind)).then(response => {
        this.tableLoading3 = false;
        console.log(response.data)
        try {
          let staffFmt = JSON.parse(response.data)
          let staffPage = staffFmt.pageview;
          this.pageSize3 = +staffPage.page_size; // 每页显示条数
          this.totalrecord3 = +staffPage.totalrecord; // 总数据条数
          let staffData = staffFmt.pageview.records;
          this.tableData3 = staffData; // 表格数据
        } catch (e) {
          this.tableData3 = [];
          this.$message({ message: "未查询到数据！", type: 'error', });
        }
      }, response => {
        this.tableLoading3 = false;
        this.$message({ message: "查询数据失败：" + response, type: 'error', });
      })
    },
    // 解绑
    unBing(i, row) {
      this.$axios.get('ax_axUnSub.action?id=' + row.id).then(response => {
        this.$message({ message: "解绑成功！", type: 'success', });
        this.getBindTable();
      }, response => {
        this.$message({ message: "解绑失败：" + response, type: 'error', });
      })
    },

  },
  created() {
    this.getNumberDisplay()
    this.getCL()
    this.getSmsOnHook()
    this.getBinding()
  },
};

</script>
