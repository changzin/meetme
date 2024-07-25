<template>
    <div class="container0">
        <MeetHeader />
        <div class="search">
            <div class="search_icon"></div>
            <input class="search_box" type="text" placeholder="검색" />
        </div>    
        <div class="container_chat">
            <div class="chat_list">
                <div class="profile_circle"></div>
                <div class="chat_container">
                    <div class="chat_name">안녕</div>
                    <div class="chat_content">
                        <div class="chat_contnet_chat">fdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdff</div>
                        <div class="chat_content_time">·2달전</div>
                    </div>
                </div>
            </div>
            <div class="chat_list">
                <div class="profile_circle"></div>
                <div class="chat_container">
                    <div class="chat_name">안녕</div>
                    <div class="chat_content">
                        <div class="chat_contnet_chat">fdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdff</div>
                        <div class="chat_content_time">·2달전</div>
                    </div>
                </div>
            </div>
            <div class="chat_list">
                <div class="profile_circle"></div>
                <div class="chat_container">
                    <div class="chat_name">안녕</div>
                    <div class="chat_content">
                        <div class="chat_contnet_chat">fdsf</div>
                        <div class="chat_content_time">·2달전</div>
                    </div>
                </div>
            </div>
            <div class="chat_list">
                <div class="profile_circle"></div>
                <div class="chat_container">
                    <div class="chat_name">안녕</div>
                    <div class="chat_content">
                        <div class="chat_contnet_chat">fdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdff</div>
                        <div class="chat_content_time">·2달전</div>
                    </div>
                </div>
            </div>
            <div class="chat_list">
                <div class="profile_circle"></div>
                <div class="chat_container">
                    <div class="chat_name">안녕</div>
                    <div class="chat_content">
                        <div class="chat_contnet_chat">fdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdff</div>
                        <div class="chat_content_time">·2달전</div>
                    </div>
                </div>
            </div>
            <div class="chat_list">
                <div class="profile_circle"></div>
                <div class="chat_container">
                    <div class="chat_name">안녕</div>
                    <div class="chat_content">
                        <div class="chat_contnet_chat">fdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdff</div>
                        <div class="chat_content_time">·2달전</div>
                    </div>
                </div>
            </div>
            <div class="chat_list">
                <div class="profile_circle"></div>
                <div class="chat_container">
                    <div class="chat_name">안녕</div>
                    <div class="chat_content">
                        <div class="chat_contnet_chat">fdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdff</div>
                        <div class="chat_content_time">·2달전</div>
                    </div>
                </div>
            </div>
            <div class="chat_list">
                <div class="profile_circle"></div>
                <div class="chat_container">
                    <div class="chat_name">안녕</div>
                    <div class="chat_content">
                        <div class="chat_contnet_chat">fdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdff</div>
                        <div class="chat_content_time">·2달전</div>
                    </div>
                </div>
            </div>
            <div class="chat_list">
                <div class="profile_circle"></div>
                <div class="chat_container">
                    <div class="chat_name">안녕</div>
                    <div class="chat_content">
                        <div class="chat_contnet_chat">fdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdff</div>
                        <div class="chat_content_time">·2달전</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style scope>
       /* font */
       @import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css); 
        div{
            font-family: 'Noto Sans KR', sans-serif;
            font-size: 16px;
            color:#555555;
        }
        input::placeholder{
        font-family: 'Noto Sans KR', sans-serif;
        }
        
        /* div */
        div.container0{
            width: 600px;
            height: 100vh;
            margin:0 auto; 
            /* border:1px solid red; */
            display: flex; /* 그리드 대신 플렉스를 사용 */
            flex-direction: column; /* 세로 방향으로 아이템 정렬 */
            justify-content: flex-start; /* 상단으로 정렬 */   
            border: none;
            padding-bottom: 60px;
            background: none;
        }
        div.search{
            border-radius: 5px;
            background: white;
        }
        .search_box{
            width: 548px;
            height: 45px;
            margin-top : 10px;
            margin-left: 26px;
            margin-right: 26px;
            margin-bottom: 25px;
            border-radius: 15px;
            background-color: #f5f5f5;
            text-indent: 45px;
            /* border: 1px solid pink; */
            display: grid;
            align-content: center;
            border: none;
            box-sizing: border-box;
            outline: none;
        }

        .search_container{
            display: flex;
            /* border: 1px solid green; */
        }
        div.container_chat{
            height: 100vh;
            overflow: scroll; 
            background: white;
            /* border:4px solid green */
        }
        div.container_chat::-webkit-scrollbar {
        display: none;
        }   

        div.chat_list{
            margin-left: 36px;
            margin-right: 36px;
            margin-bottom: 20px;
            /* border: 1px solid green; */
            display: grid;
            grid-template-columns: 88px auto ;
            align-items: center;
            cursor: pointer;
        }

        div.chat_container{
            /* border: 1px solid red; */
        }

        div.chat_name{
            /* border: 1px solid yellow; */
            font-weight: bold;
            word-break: break-all;
            text-align: left;
        }
        div.chat_content{
            /* border:1px solid blue; */
            display: flex;
            gap: 10px;
            grid-template-columns: auto auto;
            margin-bottom: 10px;
            word-break: break-all;
        }
        div.chat_contnet_chat{
            /* border: 1px solid red; */
            max-width: 350px;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow:ellipsis

        }
        div.chat_content_time{
            color: #888888;
            /* border: 1px solid red; */
        }


        /* 아이콘 */
        .search_icon{
            width: 16px;
            height: 16px;
            position: relative;
            left:45px;
            top:42px;
            background-color: aqua;
        }

        /* 이미지 */
        
        .profile_circle{
            width: 75px;
            height: 75px;
            border-radius: 50px;

            background-color: #f5f5f5;
        }

</style>