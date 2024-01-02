import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const TableBody = ({ leftLabel, leftContent, rightLabel, rightContent }) => {
  return (
    <div className='flex'>
      <div className='w-1/2 flex p-4'>
        <div className='pr-3'>{leftLabel}</div>
        <div className='pl-3'>{leftContent}</div>
      </div>
      <div className='flex p-4'>
        <div className='pr-3'>{rightLabel}</div>
        <div className='pl-3'>{rightContent}</div>
      </div>
    </div>
  )
}

const AwningDetail = () => {
  const { deviceId } = useParams();

  const [awningDetailData, setAwningDetailData] = useState([]);
  const [isEdited, setIsEdited] = useState(false);


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
  const finishDate = toIsoDateString(awningDetailData['finshDate']);
  const lastReportedDate = toIsoDateString(awningDetailData['lastReportedDate']);

  const openEdit = () => {
    setIsEdited(true);
  }

  const openEditCancle = () => {
    setIsEdited(false);
  }



  return (
    <div>
      <div className='h-screen'>
        <div className='w-full h-full'>
          <div className='bg-gray-100 pt-10'>
            <div className='flex justify-between p-1 border-b px-4'>
              <div className='flex pb-1 items-center'>
                <div className='text-2xl pr-7'>상세정보</div>
                {isEdited ? (
                  <div>
                    <button className='border p-1 bg-white rounded-lg shadow-md mr-3'>수정완료</button>
                    <button onClick={openEditCancle} className='border p-1 bg-white rounded-lg shadow-md'>수정취소</button>
                  </div>
                ) : (
                  <button onClick={openEdit} className='border p-1 bg-white rounded-lg shadow-md'>수정하기</button>

                )}
              </div>
              <div className='flex pb-1 pr-16'>
                <div className='pr-2'>설치일자 :</div>
                <div>{startDate}</div>
                <div className='px-1'>/</div>
                <div className='pr-2'>계약만료기간 :</div>
                <div>{finishDate}</div>
              </div>
            </div>
            <div className='pt-3'>
              <div className='flex flex-col bg-orange-100'>
                <div className='flex p-4'>
                  <div className='pr-3'>관리구역</div>
                  <div className='pr-3'>{`${awningDetailData['managementArea1']} ${awningDetailData['managementArea2']}`}</div>
                </div>
                <div className='flex p-4'>
                  <div className='pr-3'>관리번호</div>
                  <div className='pr-3'>{awningDetailData['managementNumber']}</div>
                </div>
                <TableBody leftLabel="기구ID" leftContent={awningDetailData['deviceId']} rightLabel="제어기ID" rightContent={awningDetailData['controlId']} />
                <div className='flex p-4'>
                  <div className='pr-3'>설치장소</div>
                  <div className='pr-3'>{awningDetailData['installationLocationMemo']}</div>
                </div>
                <TableBody leftLabel="어닝 열림시간 - 좌" leftContent={awningDetailData['awningOpenTimeLeft']} rightLabel="어닝 열림시간 - 우" rightContent={awningDetailData['awningOpenTimeRight']} />
                <div className='flex p-4'>
                  <div className='pr-3'>어닝 열림 예정시간</div>
                  <div className='pr-3'>{awningDetailData['awningOpenScheduleTime']}</div>
                </div>
                <TableBody leftLabel="풍속 임계값" leftContent={awningDetailData['windSpeedThreshold']} rightLabel="어닝 재열림 시간(분)" rightContent={awningDetailData['awningReopenTimeMinutes']} />
                <TableBody leftLabel="위도" leftContent={awningDetailData['latitude']} rightLabel="경도" rightContent={awningDetailData['longitude']} />
                <TableBody leftLabel="작동모드" leftContent={awningDetailData['statusOperationMode']} rightLabel="통신 상태" rightContent={awningDetailData['statusConnected']} />
                <TableBody leftLabel="조명" leftContent={awningDetailData['statusLighting']} rightLabel="어닝" rightContent={awningDetailData['statusAwningExpand']} />
                <TableBody leftLabel="온도" leftContent={awningDetailData['statusTemperature']} rightLabel="풍속" rightContent={awningDetailData['statusWindSpeed']} />
                <TableBody leftLabel="배터리" leftContent={awningDetailData['statusBatteryCharge']} rightLabel="마지막 보고일" rightContent={lastReportedDate} />
                <TableBody leftLabel="조명 상태" leftContent={awningDetailData['lightingCondition']} rightLabel="조명 메세지" rightContent={awningDetailData['lightingMessage']} />
                <TableBody leftLabel="어닝 상태" leftContent={awningDetailData['awningCondition']} rightLabel="어닝 메세지" rightContent={awningDetailData['awningMessage']} />
                <TableBody leftLabel="배터리 상태" leftContent={awningDetailData['batteryCondition']} rightLabel="배터리 메세지" rightContent={awningDetailData['batteryMessage']} />
              </div>
            </div>
          </div>
        </div>
        <div className='bg-slate-600'>
          <div>로그</div>
        </div>
      </div>
    </div>
  )
}

export default AwningDetail;