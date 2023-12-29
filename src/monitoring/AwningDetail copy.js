import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const TableBody = ({ leftLabel, leftContent, rightLabel, rightContent }) => {
  return (
    <div className='flex'>
      <div className='w-1/2 flex p-4'>
        <div>{leftLabel}</div>
        <div>{leftContent}</div>
      </div>
      <div className='flex p-4'>
        <div>{rightLabel}</div>
        <div>{rightContent}</div>
      </div>
    </div>
  )
}

const AwningDetail = () => {
  const { deviceId } = useParams();

  const [awningDetailData, setAwningDetailData] = useState([]);

  useEffect(() => {
    const fetchAwningDetail = () => {
      fetch(`http://10.125.121.206:8080/user/device/view/${deviceId}`, {
        method: "GET",
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      })
        .then(resp => resp.json())
        .then((data) => {
          setAwningDetailData(data);
          console.log("detail", data)
        })
        .catch(err => console.error(err))
    }
    fetchAwningDetail();
  }, [])

  return (
    <div>
      <div className='h-screen'>
        <div>
          <div className='bg-gray-100'>데이터 수정</div>
        </div>
        {/* <div className='pt-10 '> */}
        <div className='w-full h-full p-4 pt-10'>
          <div className='bg-gray-100'>
            <div className='flex justify-between p-1 border-b '>
              <div className='pb-1'>상세정보</div>
              <div className='pb-1'>설치일자</div>
            </div>
            <div className='pt-3'>
              <div className='flex flex-col bg-orange-100'>
                <div className='flex p-4'>
                  <div>관리구역</div>
                  <div>123</div>
                </div>
                <div className='flex p-4'>
                  <div>관리번호</div>
                  <div>123</div>
                </div>
                {/* <div className='flex'>
                  <div className='w-1/2 flex p-4'>
                    <div>기구ID</div>
                    <div>기구ID</div>
                  </div>
                  <div className='flex p-4'>
                    <div>제어기ID</div>
                    <div>제어기ID</div>
                  </div>
                </div> */}
                <TableBody leftLabel="기구ID" leftContent="id" rightLabel="제어기ID" rightContent="idd" />
                <div className='flex p-4'>
                  <div>설치장소</div>
                  <div>설치장소</div>
                </div>
                <TableBody leftLabel="어닝 열림시간 - 좌" leftContent="id" rightLabel="어닝 열림시간 - 우" rightContent="idd" />
                <div className='flex p-4'>
                  <div>어닝 열림 예정시간</div>
                  <div>어닝 열림 예정시간</div>
                </div>
                <TableBody leftLabel="풍속 임계값" leftContent="id" rightLabel="어닝 재열림 시간(분)" rightContent="idd" />
                <TableBody leftLabel="위도" leftContent="id" rightLabel="경도" rightContent="idd" />
                <TableBody leftLabel="작동모드" leftContent="id" rightLabel="통신 상태" rightContent="idd" />
                <TableBody leftLabel="조명" leftContent="id" rightLabel="어닝" rightContent="idd" />
                <TableBody leftLabel="온도" leftContent="id" rightLabel="풍속" rightContent="idd" />
                <TableBody leftLabel="배터리" leftContent="id" rightLabel="마지막 보고일" rightContent="idd" />
                <TableBody leftLabel="조명 상태" leftContent="id" rightLabel="조명 메세지" rightContent="idd" />
                <TableBody leftLabel="어닝 상태" leftContent="id" rightLabel="어닝 메세지" rightContent="idd" />
                <TableBody leftLabel="배터리 상태" leftContent="id" rightLabel="배터리 메세지" rightContent="idd" />
                <div className='flex'>
                  <div className='w-1/2 flex p-4'>
                    <div>어닝 열림시간 - 좌</div>
                    <div>어닝 열림시간 - 좌</div>
                  </div>
                  <div className='flex p-4'>
                    <div>어닝 열림시간 - 우</div>
                    <div>어닝 열림시간 - 우</div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 flex p-4'>
                    <div>풍속 임계값</div>
                    <div>풍속 임계값</div>
                  </div>
                  <div className='flex p-4'>
                    <div>어닝 재열림 시간(분)</div>
                    <div>어닝 재열림 시간(분)</div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 flex p-4'>
                    <div>위도</div>
                    <div>위도</div>
                  </div>
                  <div className='flex p-4'>
                    <div>경도</div>
                    <div>경도</div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 flex p-4'>
                    <div>작동모드</div>
                    <div>작동모드</div>
                  </div>
                  <div className='flex p-4'>
                    <div>통신 상태</div>
                    <div>통신 상태</div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 flex p-4'>조명</div>
                  <div className='flex p-4'>어닝</div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 flex p-4'>온도</div>
                  <div className='flex p-4'>풍속</div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 flex p-4'>배터리</div>
                  <div className='flex p-4'>마지막 보고일</div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 flex p-4'>조명 상태</div>
                  <div className='flex p-4'>조명 메세지</div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 flex p-4'>어닝 상태</div>
                  <div className='flex p-4'>어닝 메세지</div>
                </div>
                <div className='flex'>
                  <div className='w-1/2 flex p-4'>배터리 상태</div>
                  <div className='flex p-4'>배터리 메세지</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className='bg-slate-600'>
          <div>로그</div>
        </div>
      </div>
    </div>
  )
}

export default AwningDetail;