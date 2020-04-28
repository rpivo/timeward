import React, { createContext, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import Alignment from '@components/Alignment';
import Input from '@components/Input';
import BarGraph from '@components/BarGraph';
import PieChart from '@components/PieChart';
import Section from '@components/Section';
import Tile from '@components/Tile';
import Timeline from '@components/Timeline';
import Timer from '@components/Timer';
import Timesheet from '@components/Timesheet';
import StyledDashboard from '@styles/pages/Dashboard.styled';

type DashboardAction = {
  type: 'stop';
  payload: number;
};

type DashboardStore = {
  label: string | undefined;
  seconds: number;
}[];

const initialDashboardStore: DashboardStore = [
  {
    label: '',
    seconds: 0,
  },
];

type DashboardContextType = {
  dispatch: React.Dispatch<DashboardAction>;
  store: DashboardStore;
  totalSeconds: number;
};

export const DashboardContext = createContext({} as DashboardContextType);

const Dashboard: React.FC = (): JSX.Element => {
  const [totalSeconds, setTotalSeconds] = useState(0);

  const ref = useRef<HTMLInputElement>(null);

  const getLabelIndex = (label: string, store: DashboardStore): number =>
    store.findIndex(record => record.label === label);

  const reducer = useCallback((state: DashboardStore, action: DashboardAction): DashboardStore => {
    switch (action.type) {
      default: {
        const refValue = ref.current!.value;
        const labelIndex = getLabelIndex(refValue, state);
        if (refValue && labelIndex !== -1) {
          return state.map(record => {
            if (record.label === refValue) {
              record.seconds += action.payload;
            }
            return record;
          });
        }
        return [
          ...state,
          {
            label: refValue,
            seconds: action.payload,
          },
        ];
      }
    }
  }, []);

  const [store, dispatch] = useReducer(reducer, initialDashboardStore);

  useEffect((): void => {
    setTotalSeconds(store.reduce((acc, record) => acc + record.seconds, 0));
    ref.current!.value = '';
  }, [store]);

  const getStringFromSeconds = (seconds: number): string =>
    new Date(seconds * 1000).toISOString().substr(11, 8);

  return (
    <StyledDashboard>
      <DashboardContext.Provider value={{ dispatch, store, totalSeconds }}>
        <Section>
          <Tile>
            <Alignment horizontal>
              <Input ref={ref} />
            </Alignment>
            <Alignment horizontal>
              <Timer />
            </Alignment>
            <Timesheet>
              {store.map((record, index) =>
                <Timesheet.Record
                  key={index}
                  label={record.label!}
                  seconds={getStringFromSeconds(record.seconds)}
                />
              )}
              <div>Today: {getStringFromSeconds(totalSeconds)}</div>
            </Timesheet>
          </Tile>
          <Tile>
            <BarGraph />
          </Tile>
        </Section>
        <PieChart />
        <Tile width='full'>
          <Timeline>
            <Timeline.Day day={0} recordCount={store.length} />
            <Timeline.Day day={1} />
            <Timeline.Day day={2} />
            <Timeline.Day day={3} />
            <Timeline.Day day={4} />
            <Timeline.Day day={5} />
            <Timeline.Day day={6} />
          </Timeline>
        </Tile>
      </DashboardContext.Provider>
    </StyledDashboard >
  );
};

export default Dashboard;
