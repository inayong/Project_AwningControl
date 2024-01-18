import React, { useEffect, useRef, useState } from 'react'
import { SigunguData } from '../data/SigunguData';

const UserView = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userUpdateModal, setUserUpdateModal] = useState(false);
  const [userAddModal, setUserAddModal] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      fetch("http://10.125.121.206:8080/user/use/view", {
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
        .then(resp => resp.json())
        .then(data => {
          setUserInfo(data);
          console.log("user", data)
        })
        .catch(err => console.error(err))
    }

    fetchUser();

  }, []);

  // const handleUserUpdate = () => {
  //   setUserUpdateModal(true);
  // }

  //add
  const loginid = useRef();
  const loginpwd = useRef();
  const manageArea1 = useRef();
  const manageArea2 = useRef();
  const depart = useRef();
  const rank = useRef();
  const manager = useRef();
  const contact = useRef();
  const type = useRef();
  const { sigungu, si } = SigunguData();
  const [guSel, setGuSel] = useState([]);
  const [selectedSi, setSelectedSi] = useState('');
  const [selectedGu, setSelectedGu] = useState('');
  const [selectedDong, setSelectedDong] = useState('');
  const [dongSel, setDongSel] = useState([]);

  const handleSelSi = () => {
    const selectSi = manageArea1.current.value;

    const selgufil = sigungu
      .filter((items) => items.address.split(" ")[0] === selectSi)
      .map((item) => item.address.split(" ")[1]);

    const selGu = [...new Set(selgufil)].sort();
    setGuSel(selGu);
    setSelectedSi(manageArea1.current.value)
    setSelectedGu('');
    setSelectedDong('');
  }

  const handleSelGu = () => {
    const selectSi = manageArea1.current.value;
    const selectGu = manageArea2.current.value;

    const seldongfil = sigungu
      .filter((items) => items.address.split(" ")[0] === selectSi
        && items.address.split(" ")[1] === selectGu)
      .map((item) => item.address.split(" ")[2]);

    const selDong = [...new Set(seldongfil)];
    setDongSel(selDong);
    setSelectedGu(manageArea2.current.value);
    setSelectedDong('');
  }

  const fetchAddDevice = () => {
    fetch("http://10.125.121.206:8080/admin/use/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify({
        'loginId': loginid.current.value,
        'loginPassword': loginpwd.current.value,
        'managementArea1': manageArea1.current.value,
        'managementArea2': manageArea2.current.value,
        'depart': depart.current.value,
        'rank_a': rank.current.value,
        'manager': manager.current.value,
        'contact': contact.current.value,
        'admnsType': type.current.value,
      })
    })
      .then((resp) => {
        if (resp.ok) {
          // alert("사용자 추가 완료")
          setUserAddModal(false);
          window.location.reload();
        } else {
          alert("입력을 다시 해주세요")
        }
      })
      .catch((err) => console.error("장치 추가 실패:", err))

  }

  const handleAddSubmit = () => {
    if (window.confirm("사용자를 추가하시겠습니까?")) {
      fetchAddDevice();
    }
  }

  // console.log( loginid.current.value,loginpwd.current.value,
  //    manageArea1.current.value,
  //   manageArea2.current.value,
  //   depart.current.value,
  //   rank.current.value,
  //  manager.current.value,
  //   contact.current.value,
  //   type.current.value)

  //update
  const [updateData, setUpdateData] = useState(userInfo);

  const handleUpdate = (userId) => {
    const selectData = userInfo.find(item => item.userId === userId);
    if (selectData) {
      setUpdateData(selectData);
      setUserUpdateModal(true);
    }
  }

  // useEffect(() => {
  //   setUpdateData(userInfo);
  // }, [userInfo])

  // console.log("up", updateData[0].loginId)

  //삭제
 
  const fetchUserDelete = () => {
    fetch("http://10.125.121.206:8080/admin/use/del", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: updateData.loginId
    })
      .then((resp) => {
        if (resp.ok) {
          alert("삭제 완료")
          setUserUpdateModal(false);
          window.location.reload();
          console.log("id",updateData.loginId)
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => console.error("어닝 삭제 오류:", err));
  }

  const handleUserDelete = () => {
    if (window.confirm(`${updateData.manager}사용자를 삭제하시겠습니까? `)) {
      fetchUserDelete();
    }
  }

  return (
    <div className='bg-white h-screen flex justify-center items-center flex-col space-y-7'>
      <div className='bg-neutral-100 w-5/6 h-16 flex items-center p-3 space-x-10'>
        <div className='font-NanumSquareNeoVariable font-bold'>사용자 추가</div>
        <button onClick={() => setUserAddModal(true)} className='bg-white p-2 rounded-lg font-ChosunGu font-bold'>추가</button>
        {userAddModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center py-14 font-NanumSquareNeoVariable">
            <div className="bg-white p-3 rounded-md w-1/2 h-1/2">
              <div>
                <div className='text-2xl pb-1 font-GmarketSansMedium flex justify-center'>추가</div>
                <div className='space-y-5'>
                  <div className='flex space-x-7'>
                    <div>로그인 아이디</div>
                    <input ref={loginid} className='border' />
                  </div>
                  <div className='flex space-x-7'>
                    <div>비밀번호</div>
                    <input type='password' ref={loginpwd} className='border' />
                  </div>
                  <div className='flex space-x-7'>
                    <div>관리구역</div>
                    <select onChange={handleSelSi} ref={manageArea1} value={selectedSi} className='w-44 mr-3 border font-NanumSquareNeoVariable'>
                      <option value='' className='text-gray-300'>시</option>
                      {si.map((items) => (
                        <option key={items}>{items}</option>
                      ))}
                    </select>
                    <select onChange={handleSelGu} ref={manageArea2} value={selectedGu} className='w-28 mr-3 border font-NanumSquareNeoVariable'>
                      <option value=''>구</option>
                      {guSel.map((items) => (
                        <option key={items}>{items}</option>
                      ))}
                    </select>
                  </div>
                  <div className='flex space-x-7'>
                    <div>부서명</div>
                    <input ref={depart} className='border' />
                  </div>
                  <div className='flex space-x-7'>
                    <div>직급</div>
                    <input ref={rank} className='border' />
                    <div>관리자 타입</div>
                    <input ref={type} className='border' />
                  </div>
                  <div className='flex space-x-7'>
                    <div>담당자명</div>
                    <input ref={manager} className='border' />
                  </div>
                  <div className='flex space-x-7'>
                    <div>연락처</div>
                    <input ref={contact} className='border' />
                  </div>
                </div>
                <div className='flex  justify-center space-x-5 pt-7'>
                  <button onClick={handleAddSubmit} className='border hover:bottom-2 hover:border-red-300 p-2'>추가</button>
                  <button onClick={() => setUserAddModal(false)} className='border hover:bottom-2 hover:border-blue-300 p-2'>취소</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='bg-neutral-100 w-5/6 h-2/3 rounded-lg shadow-lg font-NanumSquareNeoVariable'>
        <table className='text-center w-full'>
          <thead className='bg-neutral-300'>
            <tr className='p-3'>
              <th className='p-3'></th>
              <th className='p-3'>ID</th>
              <th>로그인 아이디</th>
              <th>관리구역</th>
              <th>부서명</th>
              <th>직급</th>
              <th>담당자명</th>
              <th>연락처</th>
              <th>관리자 타입</th>
              <th>상태</th>
              <th>생성일</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(userInfo) && userInfo.map((item, idx) => (
              <tr key={idx}>
                <td onClick={() => handleUpdate(item.userId)} className='cursor-pointer'>
                  <div className='bg-white rounded-md pt-1'>수정</div>
                </td>
                <td className='p-3'>{item.userId}</td>
                <td>{item.loginId}</td>
                <td>{item.manageArea}</td>
                <td>{item.depart}</td>
                <td>{item.rank_a}</td>
                <td>{item.manager}</td>
                <td>{item.contact}</td>
                <td>{item.manageType}</td>
                <td>{item.userStat === 'on' ? '활동' : '비활동'}</td>
                <td>{new Date(item.userCreateDate).toISOString().split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {userUpdateModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center py-14">
            <div className="bg-white p-3 rounded-md w-1/2 h-1/2">
              <div>
                <div className='text-2xl pb-1 font-GmarketSansMedium flex justify-center'>수정</div>
                <div className='space-y-5'>
                  <div className='flex space-x-7'>
                    <div>로그인 아이디</div>
                    <input name='loginId' value={updateData.loginId} onChange={e => setUpdateData({ ...updateData, loginId: e.target.value })} />
                  </div>
                  <div className='flex space-x-7'>
                    <div>변경할 비밀번호</div>
                    <input />
                  </div>
                  <div className='flex space-x-7'>
                    <div>관리구역</div>
                    <select value={updateData.manageArea1} ></select>
                    <select value={updateData.manageArea2} ></select>
                  </div>
                  <div className='flex space-x-7'>
                    <div>부서명</div>
                    <input value={updateData.depart} onChange={e => setUpdateData({ ...updateData, depart: e.target.value })} />
                  </div>
                  <div className='flex space-x-7'>
                    <div className='flex space-x-7'>
                      <div>직급</div>
                      <input value={updateData.rank_a} onChange={e => setUpdateData({ ...updateData, rank_a: e.target.value })} />
                    </div>
                    <div className='flex space-x-7'>
                      <div>관리자 타입</div>
                      <input value={updateData.admnsType} onChange={e => setUpdateData({ ...updateData, admnsType: e.target.value })} />
                    </div>
                  </div>
                  <div className='flex space-x-7'>
                    <div>담당자명</div>
                    <input value={updateData.manager} onChange={e => setUpdateData({ ...updateData, manager: e.target.value })} />
                  </div>
                  <div className='flex space-x-7'>
                    <div>연락처</div>
                    <input value={updateData.contact} onChange={e => setUpdateData({ ...updateData, contact: e.target.value })} />
                  </div>
                </div>
                <div className='flex  justify-center space-x-5 pt-2'>
                  <button onClick={() => setUserUpdateModal(false)} className='border hover:border-2 hover:border-blue-300 p-2'>취소</button>
                  <button onClick={handleUserDelete} className='border hover:border-2 hover:border-red-300 p-2'>삭제</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserView;