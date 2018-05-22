<template>
<center>
<div id="app" style="width:85%;">
  <el-container id="main">
    <el-aside style="width:30%;">
      <div style="margin:20px">
        <img src="./assets/logo.png" style="vertical-align:middle;">
      </div>
      <router-link to="/">
        <el-button @click="startHacking" type="primary">Star</el-button>
      </router-link>
      <!--router-link to="/chart" :chartData="testChartsDataInput">
        <el-button type="selection">Chart</el-button>
      </router-link-->
      <!--router-link to="/ec">
        <el-button type="success">EC</el-button>
      </router-link-->
      <router-link to="/te">
        <el-button type="success">WY</el-button>
      </router-link>

      <center id="upload">
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving || isSuccess">
          <!--The type multipart/form-data is important, otherwise Django will not accept-->
          <h1>Upload File</h1>
          <div class="dropbox">
            <input type="file" multiple :name="uploadFieldName" :disable="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept=".csv" class="input-file">
              <p v-if="isInitial || isSuccess" style="margin-bottom:0px;padding-top:20px;font-size:15px">
                Drag your file(s) here to begin<br> or click to browse
              </p>
              <p v-if="isSaving">
                Uploading {{ fileCount }} files...
              </p>
          </div>
        </form>
      </center>
    </el-aside>
    <el-container>
      <el-header><b>Data Visualization</b></el-header>
      <el-main>
        <center>
          <router-view :key="$route.fullPath"></router-view>
        </center>
      </el-main>
    </el-container>
  </el-container>
</div>
</center>

</template>

<script>
import { upload } from './components/Upload';

import router from './router';

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'App',
  data() {
    return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'file',
        testChartsDataInput: null,
        options: [
          {
            value: 'author',
            label: 'Author File'
          }, {
            value: 'submission',
            label: 'Submission File'
          }, {
            value: 'review',
            label: 'Review File'
          }
        ],
      };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 2500
      })
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      upload(formData)
        .then(x => {
          // console.log("inside success function!")
          console.log(x);
          // this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
          this.testChartsDataInput = x;

          var infoType = x.infoType;
          var infoData = x.infoData;

          // Note: use router.push to navigate through diff pages programmatically
          router.push({
            name: 'Result',
            params: {
              chartData: infoData,
              infoType: infoType
            }
          });
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });

      // save it
      this.save(formData);
    }
  },
  mounted() {
    this.reset();
  },
}

</script>

<style>

#upload {
}

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  /*padding: 10px 10px;*/
  height: 100px; /* minimum height */
  width: 90%;
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
  left: 0;   /*put this otherwise the input box will shift by half of the parent width */
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

#main {
  margin-bottom: 20px;
}

.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  margin-bottom: 5px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 30px;
  margin-right: 5px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  height: 800px;
  /*text-align: center;*/
  /*line-height: 450px;*/
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>