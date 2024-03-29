import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import UpdateAwning from './UpdateAwning';

const TableBody = ({ leftLabel, leftContent, rightLabel, rightContent }) => {
  return (
    <div className='flex'>
      <div className='w-1/2 flex p-4 items-center'>
        <div className='mr-3 font-NanumSquareNeoVariable font-bold bg-neutral-100 p-2 shadow-md'>{leftLabel}</div>
        <div className='pl-3 font-ChosunGu font-bold'>{leftContent}</div>
      </div>
      <div className='flex p-4 items-center'>
        <div className='mr-3 font-NanumSquareNeoVariable font-bold bg-neutral-100 p-2 shadow-md'>{rightLabel}</div>
        <div className='pl-3 font-ChosunGu font-bold'>{rightContent}</div>
      </div>
    </div>
  )
}

const AwningDetail = () => {
  const { deviceId } = useParams();

  const [awningDetailData, setAwningDetailData] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [showModal, setShowModal] = useState(false);


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
          // console.log("detail", data)
        })
        .catch(err => console.error(err))
    }
    fetchAwningDetail();
  }, [deviceId])

  const toIsoDateString = (dateString) => {
    if (dateString) {
      const dateTime = new Date(dateString);
      if (!isNaN(dateTime.valueOf())) { //?
        return dateTime.toISOString().split('T')[0];
      }
    }
    return ' ';
  };

  const startDate = toIsoDateString(awningDetailData['startDate']);
  const finishDate = toIsoDateString(awningDetailData['finishDate']);
  const lastReportedDate = toIsoDateString(awningDetailData['lastReportedDate']);

  const openEdit = () => {
    // setIsEdited(true);
    setShowModal(true);
  }

  // const openEditCancle = () => {
  //   setIsEdited(false);
  // }

  // const handleUpdate = (updateData) => {
  //   setAwningDetailData(updateData);
  //   setShowModal(false);
  // }



  return (
    <div>
      <div className='h-screen'>
        <div className='w-full h-full'>
          <div className='bg-white pt-10'>
            <div className='px-4 p-1'>
              <div className='flex justify-between border-b-2'>
                <div className='flex pb-1 items-center'>
                  <div className='text-2xl pr-7 font-GmarketSansMedium font-bold'>상세정보</div>
                  <button onClick={openEdit} className='p-1 bg-gray-200 hover:bg-white hover:border-2 hover:border-gray-400 rounded-lg shadow-md font-NanumSquareNeoVariable mb-2'>수정</button>
                  {showModal && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center py-14">
                      <div className="bg-white p-3 rounded-md w-1/2 h-full">
                        <div>
                          <div className='text-2xl pb-1 font-GmarketSansMedium flex justify-center'>수정</div>
                          <UpdateAwning data={awningDetailData} onClose={() => setShowModal(false)} />
                          {/* <div className="flex justify-center mt-4 pt-3">
                            <button className="px-3 py-1 bg-red-500 text-white rounded-md">수정</button>
                            <button onClick={() => setShowModal(false)} className="ml-4 px-3 py-1 bg-gray-300 rounded-md">취소</button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='flex pr-16 items-center font-GmarketSansMedium'>
                  <div className='pr-2'>설치일자 :</div>
                  <div>{startDate}</div>
                  <div className='px-1'>/</div>
                  <div className='pr-2'>계약만료기간 :</div>
                  <div>{finishDate}</div>
                </div>
              </div>
            </div>
            <div className='pt-1'>
              <div className='flex flex-col p-10 flex-grow'>
                <div className='flex p-4 items-center text-center'>
                  <div className='mr-3 font-NanumSquareNeoVariable font-bold bg-neutral-100 p-2 shadow-md'>관리구역</div>
                  <div className='pr-3 font-ChosunGu font-bold'>{`${awningDetailData['managementArea1']} ${awningDetailData['managementArea2']}`}</div>
                </div>
                <div className='flex p-4 items-center'>
                  <div className='mr-3 font-NanumSquareNeoVariable font-bold bg-neutral-100 p-2 shadow-md'>관리번호</div>
                  <div className='pr-3 font-ChosunGu font-bold'>{awningDetailData['managementNumber']}</div>
                </div>
                <TableBody leftLabel="기구ID" leftContent={awningDetailData['deviceId']} rightLabel="제어기ID" rightContent={awningDetailData['controlId']} />
                <div className='flex p-4 items-center'>
                  <div className='mr-3 font-NanumSquareNeoVariable font-bold bg-neutral-100 p-2 shadow-md'>설치장소</div>
                  <div className='pr-3 font-ChosunGu font-bold'>{awningDetailData['installationLocationMemo']}</div>
                </div>
                <TableBody leftLabel="어닝 열림시간 - 좌" leftContent={awningDetailData['awningOpenTimeLeft']} rightLabel="어닝 열림시간 - 우" rightContent={awningDetailData['awningOpenTimeRight']} />
                <div className='flex p-4 items-center'>
                  <div className='mr-3 font-NanumSquareNeoVariable font-bold bg-neutral-100 p-2 shadow-md'>어닝 열림 예정시간</div>
                  <div className='pr-3 font-ChosunGu font-bold'>{awningDetailData['awningOpenScheduleTime']}</div>
                </div>
                <TableBody leftLabel="풍속 임계값" leftContent={awningDetailData['windSpeedThreshold']} rightLabel="어닝 재열림 시간(분)" rightContent={awningDetailData['awningReopenTimeMinutes']} />
                <TableBody leftLabel="위도" leftContent={awningDetailData['latitude']} rightLabel="경도" rightContent={awningDetailData['longitude']} />
                <TableBody leftLabel="작동모드" leftContent={awningDetailData['statusOperationMode']} rightLabel="통신 상태" rightContent={awningDetailData['statusConnected']} />
                <TableBody leftLabel="조명" leftContent={awningDetailData['statusLighting']} rightLabel="어닝" rightContent={awningDetailData['statusAwningExpand']} />
                <TableBody leftLabel="온도" leftContent={awningDetailData['statusTemperature']} rightLabel="풍속" rightContent={awningDetailData['statusWindSpeed']} />
                <TableBody leftLabel="배터리" leftContent={awningDetailData['statusBatteryCharge']} rightLabel="마지막 보고일" rightContent={lastReportedDate} />
                <TableBody leftLabel="조명 상태" leftContent={awningDetailData['lightingCondition']} rightLabel="조명 메세지" rightContent={awningDetailData['lightingMessage']} />
                <TableBody leftLabel="어닝 상태" leftContent={awningDetailData['motorCondition']} rightLabel="어닝 메세지" rightContent={awningDetailData['awningMessage']} />
                <TableBody leftLabel="배터리 상태" leftContent={awningDetailData['batteryCondition']} rightLabel="배터리 메세지" rightContent={awningDetailData['batteryMessage']} />
              </div>
            </div>
          </div>
          <div className='bg-slate-600'>
            <div>로그</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AwningDetail;