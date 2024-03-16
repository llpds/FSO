import { configureStore, ThunkAction, Action }  from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import patientReducer from './reducers/patientReducer';
import diagnoseReducer from './reducers/diagnoseReducer';

const store = configureStore({
  reducer: {
    patients: patientReducer,
    diagnoses: diagnoseReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export default store;