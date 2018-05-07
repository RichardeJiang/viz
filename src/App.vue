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
      <router-link to="/add">
        <el-button type="selection">End</el-button>
      </router-link>
      <router-link to="/ec">
        <el-button type="success">EC</el-button>
      </router-link>
      <!--Original Element Style Upload Component-->
      <!--div style="line-height:20px;margin-left:10px; margin-bottom: 10px" align="left">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="handleSuccess"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">Click to upload</el-button>
          <div slot="tip" class="el-upload__tip" style="margin-left:5px">jpg/png files with a size less than 500kb</div>
        </el-upload>
      </div-->
      <center id="upload">
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
          <!--The type multipart/form-data is important, otherwise Django will not accept-->
          <h1>Upload File</h1>
          <div class="dropbox">
            <input type="file" multiple :name="uploadFieldName" :disable="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept=".csv" class="input-file">
              <p v-if="isInitial" style="margin-bottom:0px;padding-top:20px">
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
      <el-header>Header</el-header>
      <el-main>
        <center>
          <router-view/>
        </center>
      </el-main>
    </el-container>
  </el-container>
  <div>
    <!--router-link :to="{ name: 'HelloWorld' }"-->
  </div>
</div>
</center>

</template>

<script>
import { upload } from './components/Upload';

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'App',
  data() {
    return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'file',
        testEChartsDataInput: null
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
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    // handleSuccess(response, file, fileList) {
    //   console.log(file);
    //   var fileName = file[0].name;
    //   this.$notify({
    //     title: 'OK!',
    //     type: 'success',
    //     message: 'The file ' + fileName,
    //     duration: 2000
    //   })
    // },
    // handleExceed(files, fileList) {
    //   this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
    // },
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`Sure to remove ${ file.name }？`);
    // }
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
  margin-top: 60px;
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
  height: 500px;
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