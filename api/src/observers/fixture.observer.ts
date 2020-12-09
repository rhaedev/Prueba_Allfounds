import {
  /* inject, Application, CoreBindings, */
  lifeCycleObserver, // The decorator
  LifeCycleObserver, // The interface
} from '@loopback/core';
import { repository } from '@loopback/repository';
import { NEWS_DATA } from '../fixture-data'

import { NewRepository } from '../repositories'

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class FixtureObserver implements LifeCycleObserver {

  @repository(NewRepository)
  public newRepository : NewRepository
  /*
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
  ) {}
  */

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    console.log('[Starting-Fixtures]');

    let countNews = await this.newRepository.count();
    console.log('News found:', countNews);
    if (countNews.count == 0) {
      for (const news of NEWS_DATA) {
        try {
          let newsInserted = await this.newRepository.create(news);
          console.log('News Inserted:',newsInserted);
        }catch (err) {
          console.log('[ERROR] - Fixture News');
        }
      }
    } else {
      console.log('[SKIP] News Fixtures');
    }

    console.log('[------------------------]')
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
